import { Input } from "./ui/input";

export default function SendTransaction() {
  return (
    <div className="rounded-2xl border border-white w-full py-4 px-6 flex flex-col gap-10 items-start">
      <header className="space-y-3">
        <h1 className="*:bg-[#E57F2C] text-black flex flex-col text-2xl *:px-1  gap-1 font-semibold">
          <span className="w-fit">Send a</span>
          <span className="w-fit">transaction</span>
        </h1>
        <p>Send tokens in Rootstock using Web3Auth</p>
      </header>
      <div className="grid md:grid-cols-2 w-full gap-5">
        <label className="flex flex-col gap-2">
          <span className="pl-2 font-bold">Token</span>
          <Input type="select" />
        </label>
        <label className="flex flex-col gap-2">
          <span className="pl-2 font-bold">Token</span>
          <Input />
        </label>
        <label className="flex flex-col gap-2">
          <span className="pl-2 font-bold">Token</span>
          <Input />
        </label>
        <label className="flex flex-col gap-2">
          <span className="pl-2 font-bold">Token</span>
          <Input />
        </label>
      </div>
    </div>
  );
}
