import { IProvider } from "@web3auth/base";
import RPC from "@/app/viemRPC";
import { useEffect, useState } from "react";
import CheckBalance from "./CheckBalance";
import { cn, formatAdress } from "@/lib/utils";
import Copy from "./Copy";
import Button from "./ui/Button";
import SignMessage from "./SignMessage";
import SendTransaction from "./SendTransaction";

export default function Web3AuthSection({
  login,
  loggedIn,
  provider,
  logout,
}: {
  login: () => Promise<void>;
  loggedIn: boolean;
  provider: IProvider | null;
  logout: () => Promise<void>;
}) {
  const [address, setAddress] = useState("");

  const getAccounts = async () => {
    if (!provider) {
      return;
    }
    const address = await RPC.getAccounts(provider);
    setAddress(address);
  };

  useEffect(() => {
    getAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  return (
    <section className="mt-[5em] p-3 space-y-5">
      <div className="flex flex-col gap-5">
        <p>
          <span className="font-bold bg-[#4CD42E] py-px px-2 rounded-full text-black">
            1.
          </span>{" "}
          Log In with Web3Auth
        </p>
        {loggedIn ? (
          address ? (
            <div className="flex justify-center gap-5">
              <p className="bg-gray-700/30 py-1 px-3  rounded flex gap-1 items-center">
                <span className="font-bold mr-1">Wallet:</span>
                {formatAdress(address[0])}
                <Copy text={address[0]} />
              </p>
              <Button onClick={logout}>Logout</Button>
            </div>
          ) : null
        ) : (
          <button
            onClick={login}
            className="bg-blue-500 text-primary py-1 px-4 rounded-sm my-1 mx-auto font-bold"
          >
            Log in / Sign up
          </button>
        )}
      </div>
      <div className="flex flex-col gap-10">
        <p>
          <span className="font-bold bg-[#F86FEC] py-px px-2 rounded-full text-black">
            2.
          </span>{" "}
          Try out signing a message or sending a transaction
        </p>
        <section
          className={cn(
            "space-y-5",
            !loggedIn ? "opacity-30 pointer-events-none" : null
          )}
        >
          <CheckBalance />
          <SignMessage />
          <SendTransaction />
        </section>
      </div>
    </section>
  );
}
