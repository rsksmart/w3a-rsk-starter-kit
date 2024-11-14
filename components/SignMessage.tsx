"use client";

import { web3auth } from "@/app/page";
import Button from "./ui/Button";
import RPC from "@/app/viemRPC";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { formatAdress } from "@/lib/utils";

export default function SignMessage() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const handleClick = async () => {
    setLoading(true);
    try {
      if (!web3auth.provider) {
        return;
      }
      const hash = await RPC.signMessage(web3auth.provider);
      toast({
        title: "Message signed successfully",
        description: `Signature hash: ${formatAdress(hash)}`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error signing message",
        description: error.message,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white w-full py-4 px-6 flex justify-between md:flex-row gap-10 items-center">
      <h1 className="*:bg-[#4CD42E] text-black flex flex-col text-2xl *:px-1  gap-1 font-semibold">
        <span className="w-fit">Sign a</span>
        <span>message</span>
      </h1>
      <p>
        Sign your first message in <br /> Rootstock via Web3Auth
      </p>
      <Button disabled={loading} onClick={handleClick}>
        {loading ? "Loading..." : "Sign message"}
      </Button>
    </div>
  );
}
