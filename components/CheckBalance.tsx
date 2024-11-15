"use client";

import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import RPC from "@/app/viemRPC";
import { web3auth } from "@/app/page";

export default function CheckBalance() {
  const [loading, setLoading] = useState(false);
  const [customLoading, setCustomLoading] = useState(false);
  const [trbtcBalance, setTrbtcBalance] = useState("");
  const [usdrifBalance, setUsdrifBalance] = useState("");
  const [docBalance, setDocBalance] = useState("");
  const [trifBalance, setTrifBalance] = useState("");
  const [customTokenBalance, setCustomTokenBalance] = useState("");
  const [customTokenSymbol, setCustomTokenSymbol] = useState("");
  const [customTokenAddress, setCustomTokenAddress] = useState("");
  const [error, setError] = useState("");

  const getBalances = async () => {
    if (!web3auth.provider) {
      return;
    }

    setLoading(true);
    try {
      const trbtc = await RPC.getBalance(web3auth.provider);
      const usdrif = await RPC.getBalance(web3auth.provider, "usdrif");
      const doc = await RPC.getBalance(web3auth.provider, "doc");
      const trif = await RPC.getBalance(web3auth.provider, "trif");
      setTrbtcBalance(trbtc);
      setUsdrifBalance(usdrif);
      setDocBalance(doc);
      setTrifBalance(trif);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getCustomTokenDetails = async (address: string) => {
    if (!address || !web3auth.provider) return;

    setCustomLoading(true);
    setError("");
    try {
      const symbol = await RPC.getTokenSymbol(
        web3auth.provider,
        address.toLowerCase() as `0x${string}`
      );
      const balance = await RPC.getBalance(
        web3auth.provider,
        undefined,
        address.toLowerCase() as `0x${string}`
      );
      setCustomTokenSymbol(symbol);
      setCustomTokenBalance(balance);
    } catch (error: any) {
      console.error(error);
      setCustomTokenSymbol("");
      setCustomTokenBalance("");
      setError("Failed to fetch token details. Please check the address.");
    } finally {
      setCustomLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const address = e.target.value;
    setCustomTokenAddress(address);

    if (address) {
      getCustomTokenDetails(address);
    } else {
      setCustomTokenSymbol("");
      setCustomTokenBalance("");
      setError("");
    }
  };

  useEffect(() => {
    if (web3auth.provider) {
      getBalances();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3auth.provider]);

  return (
    <div className="rounded-2xl border border-white w-full py-4 px-6 flex flex-col md:flex-row gap-10 items-center">
      <h1 className="*:bg-[#F86FEC] text-black flex flex-col text-2xl *:px-1  gap-1 font-semibold">
        <span className="w-fit">Check</span>
        <span>balances</span>
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:gap-x-32 gap-10 grow w-full">
        <div className="flex flex-col">
          <p className="font-bold">tRIF</p>
          <p>{loading ? "Loading..." : trifBalance}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">USDRIF</p>
          <p>{loading ? "Loading..." : usdrifBalance}</p>
        </div>
        <div className="flex md:flex-col md:row-span-2 md:col-span-2 justify-between row-start-3">
          <div className="flex flex-col">
            <label className="flex flex-col md:flex-row md:items-center gap-1">
              <span className="font-bold ml-1">Custom token:</span>
              <Input
                placeholder="Token address"
                className="w-full"
                value={customTokenAddress}
                onChange={handleInputChange}
              />
            </label>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          {customLoading ? <p className="pb-3">Loading...</p> : null}
          {customTokenSymbol ? (
            <div className="mt-2">
              <p className="font-bold">{customTokenSymbol}</p>
              <p>{customTokenBalance}</p>
            </div>
          ) : null}
        </div>
        <div className="flex flex-col">
          <p className="font-bold">tRBTC</p>
          <p>{loading ? "Loading..." : trbtcBalance}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">DoC</p>
          <p>{loading ? "Loading..." : docBalance}</p>
        </div>
      </div>
    </div>
  );
}
