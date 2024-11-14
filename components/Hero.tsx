import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full flex flex-col md:flex-row justify-between items-center mt-[10%] gap-10">
      <div className="space-y-10">
        <h1 className="lg:text-6xl text-4xl font-bold flex gap-5 flex-col text-black items-center md:items-start md:ml-5">
          <div>
            <span className="bg-[#E57F2C] py-1 px-3">Rootstock</span>{" "}
            <span className="bg-white py-1 px-3 ml-2">&</span>
          </div>
          <span className="bg-[#4CD42E] w-fit py-1 px-3 mt-2 ml-20">
            Web3Auth
          </span>
          <span className="bg-[#F86FEC] w-fit py-1 px-3">Starter Kit</span>
        </h1>
        <p className="md:w-3/4 px-3">
          Kickstart your project with our Rootstock and Web3Auth starter kit—
          <span className="font-bold">
            designed to help you focus on crafting your business model
          </span>
          , not just the technical implementation.{" "}
          <span className="font-bold">
            Perfect for hackathons and rapid prototyping
          </span>
          !
        </p>
      </div>
      <Image
        src={"/images/blocks.png"}
        width={350}
        height={300}
        alt="hero image"
        className="w-72 md:w-auto md:mr-5"
      />
    </section>
  );
}
