import { Input } from "./ui/input";

export default function CheckBalance() {
  return (
    <div className="rounded-2xl border border-white w-full py-4 px-6 flex flex-col md:flex-row gap-10 items-center">
      <h1 className="*:bg-[#F86FEC] text-black flex flex-col text-2xl *:px-1  gap-1 font-semibold">
        <span className="w-fit">Check</span>
        <span>balances</span>
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:gap-x-32 gap-10 grow w-full">
        <div className="flex flex-col">
          <p className="font-bold">tRIF</p>
          <p>0.3982</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">USDRIF</p>
          <p>0.3982</p>
        </div>
        <div className="flex md:flex-col md:row-span-2 md:col-span-2 justify-between row-start-3">
          <label className="flex flex-col md:flex-row md:items-center gap-1">
            <span className="font-bold ml-1">Custom token:</span>
            <Input placeholder="Token address" className="w-full" />
          </label>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">tRBTC</p>
          <p>0.3982</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">DoC</p>
          <p>0.3982</p>
        </div>
      </div>
    </div>
  );
}
