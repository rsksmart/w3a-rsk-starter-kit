import {
  createWalletClient,
  createPublicClient,
  custom,
  formatEther,
  parseEther,
} from "viem";
import { mainnet, polygonAmoy, rootstockTestnet, sepolia } from "viem/chains";
import type { IProvider } from "@web3auth/base";
import { TOKENS } from "@/lib/constants";

const getViewChain = (provider: IProvider) => {
  switch (provider.chainId) {
    case "1":
      return mainnet;
    case "0x13882":
      return polygonAmoy;
    case "0xaa36a7":
      return sepolia;
    default:
      return mainnet;
  }
};

const getChainId = async (provider: IProvider): Promise<any> => {
  try {
    const walletClient = createWalletClient({
      transport: custom(provider),
    });

    const address = await walletClient.getAddresses();
    console.log(address);

    const chainId = await walletClient.getChainId();
    return chainId.toString();
  } catch (error) {
    return error;
  }
};
const getAccounts = async (provider: IProvider): Promise<any> => {
  try {
    const walletClient = createWalletClient({
      chain: getViewChain(provider),
      transport: custom(provider),
    });

    const address = await walletClient.getAddresses();

    return address;
  } catch (error) {
    return error;
  }
};

const getTokenSymbol = async (
  provider: IProvider,
  tokenAddress: `0x${string}`
): Promise<any> => {
  const publicClient = createPublicClient({
    chain: getViewChain(provider),
    transport: custom(provider),
  });

  const tokenSymbol = await publicClient.readContract({
    address: tokenAddress,
    abi: TOKENS.usdrif.abi,
    functionName: "symbol",
  });

  return tokenSymbol;
};

const getBalance = async (
  provider: IProvider,
  token?: "doc" | "trif" | "usdrif",
  tokenAddress?: `0x${string}`
): Promise<string> => {
  const publicClient = createPublicClient({
    chain: getViewChain(provider),
    transport: custom(provider),
  });

  const walletClient = createWalletClient({
    chain: getViewChain(provider),
    transport: custom(provider),
  });

  const address = await walletClient.getAddresses();

  const balance = token
    ? await publicClient.readContract({
        address: TOKENS[token].address as `0x${string}`,
        abi: TOKENS[token].abi,
        functionName: "balanceOf",
        args: [address[0]],
      })
    : tokenAddress
    ? await publicClient.readContract({
        address: tokenAddress,
        abi: TOKENS.usdrif.abi,
        functionName: "transfer",
        args: [address[0], 10],
      })
    : await publicClient.getBalance({ address: address[0] });

  return formatEther(balance as bigint);
};

const sendTransaction = async (
  provider: IProvider,
  amount: string,
  recipient: `0x${string}`,
  token: "doc" | "trif" | "usdrif" | "trbtc" | "custom",
  tokenAddress?: `0x${string}`
): Promise<any> => {
  const publicClient = createPublicClient({
    chain: getViewChain(provider),
    transport: custom(provider),
  });

  const walletClient = createWalletClient({
    chain: getViewChain(provider),
    transport: custom(provider),
  });

  const address = await walletClient.getAddresses();
  const parsedAmount = parseEther(amount);

  if (token === "trbtc") {
    const hash = await walletClient.sendTransaction({
      chain: rootstockTestnet,
      account: address[0],
      to: recipient,
      value: parsedAmount,
    });
    await publicClient.waitForTransactionReceipt({ hash, confirmations: 1 });
    return hash;
  } else if (token === "custom") {
    const { request } = await publicClient.simulateContract({
      chain: rootstockTestnet,
      account: address[0],
      address: tokenAddress as `0x${string}`,
      abi: TOKENS.usdrif.abi,
      functionName: "transfer",
      args: [recipient, parsedAmount],
    });
    const hash = await walletClient.writeContract(request);
    await publicClient.waitForTransactionReceipt({
      hash: hash,
      confirmations: 1,
    });
    return hash;
  } else {
    const { request } = await publicClient.simulateContract({
      chain: rootstockTestnet,
      account: address[0],
      address: TOKENS[token].address as `0x${string}`,
      abi: TOKENS[token].abi,
      functionName: "transfer",
      args: [recipient, parsedAmount],
    });
    const hash = await walletClient.writeContract(request);
    await publicClient.waitForTransactionReceipt({
      hash: hash,
    });
    return hash;
  }
};

const signMessage = async (provider: IProvider): Promise<any> => {
  const walletClient = createWalletClient({
    chain: getViewChain(provider),
    transport: custom(provider),
  });

  // data for signing
  const address = await walletClient.getAddresses();
  const originalMessage = "Signing a message on Rootstock!";

  // Sign the message
  const hash = await walletClient.signMessage({
    account: address[0],
    message: originalMessage,
  });

  return hash.toString();
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getChainId,
  getAccounts,
  getBalance,
  sendTransaction,
  signMessage,
  getTokenSymbol,
};
