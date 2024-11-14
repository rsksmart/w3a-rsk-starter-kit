"use client";

import {
  CHAIN_NAMESPACES,
  IAdapter,
  IProvider,
  WEB3AUTH_NETWORK,
} from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { getDefaultExternalAdapters } from "@web3auth/default-evm-adapter";
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";
import { useEffect, useState } from "react";

// import RPC from "./ethersRPC";
import Hero from "@/components/Hero";
import Web3AuthSection from "@/components/Web3AuthSection";
import RPC from "./viemRPC";
import Footer from "@/components/Footer";

const clientId =
  "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ"; // get from https://dashboard.web3auth.io

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x1f",
  rpcTarget: "https://public-node.testnet.rsk.co",
  displayName: "Ethereum Sepolia Testnet",
  blockExplorerUrl: "https://rootstock-testnet.blockscout.com",
  ticker: "tRBTC",
  tickerName: "rootstock-testnet",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3AuthOptions: Web3AuthOptions = {
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider,
};
export const web3auth = new Web3Auth(web3AuthOptions);

function App() {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const adapters = await getDefaultExternalAdapters({
          options: web3AuthOptions,
        });
        adapters.forEach((adapter: IAdapter<unknown>) => {
          web3auth.configureAdapter(adapter);
        });

        await web3auth.initModal();
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    if (web3auth.connected) {
      setLoggedIn(true);
    }
  };

  const getUserInfo = async () => {
    const user = await web3auth.getUserInfo();
    return user;
  };

  const logout = async () => {
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
  };

  const signMessage = async () => {
    if (!provider) {
      return;
    }
    const signedMessage = await RPC.signMessage(provider);
  };

  const sendTransaction = async () => {
    if (!provider) {
      return;
    }
    const transactionReceipt = await RPC.sendTransaction(provider);
  };

  return (
    <main className="w-full flex flex-col justify-center items-center">
      <section className="max-w-[1200px] w-full mx-auto">
        <Hero />
        <Web3AuthSection
          login={login}
          loggedIn={loggedIn}
          provider={provider}
          logout={logout}
        />
      </section>
      <Footer />
    </main>
  );
}

export default App;
