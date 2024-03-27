import { ImQuotesLeft } from "react-icons/im";
import OurCLientBg from "../assets/OurClient.jpg";
const OurClient = () => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${OurCLientBg})`,
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="h-[100vh] lg:h-fit py-32  justify-start"
    >
      <div className="mt-16 flex flex-col items-center justify-center gap-2 lg:gap-8 capitalize px-3 lg:px-10">
        <span className="font-semibold text-4xl text-center text-white">
          Our Client says
        </span>
        <div className="md:w-[900px]  h-[350px] bg-white shadow-xl flex py-8 flex-col   gap-4 justify-center">
          <span className="text-6xl text-center self-center">
            <ImQuotesLeft />
          </span>
          <span className="text-center px-24 text-gray-400">
            Alteration in some form injected humour words which don't even
            slightly believable. If you are going use passage of Lorem Ipsum,
            you need to be sure there isn't anything embarrassing hidden
            Alteration some form injected humour words which don't even slightly
            believable. If you going use passage humour words which don't even
            slightly believable.
          </span>
          <div className="flex flex-col gap-2 items-center">
            <span className="text-lg font-semibold ">Mr.Danail Smith</span>
            <span className="text-gray-600">Designer</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurClient;
