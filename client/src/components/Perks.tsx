import { BsSend } from "react-icons/bs";
import { FaRegThumbsUp } from "react-icons/fa6";
import { GiReturnArrow } from "react-icons/gi";
import { PiMoneyBold } from "react-icons/pi";
import { TfiHeadphoneAlt } from "react-icons/tfi";

interface PerksCompProps {
  icon: React.ReactNode;
  title: string;
  sub: string;
}
const Perks = () => {
  const PerksComp = ({ icon, title, sub }: PerksCompProps) => (
    <div className="flex flex-col gap-2 items-center">
      <span className="text-4xl">{icon}</span>
      <span className="font-semibold capitalize">{title}</span>
      <span className="text-gray-400 text-center">{sub}</span>
    </div>
  );
  return (
    <div className="max-w-[1460px] h-[100vh] lg:h-fit py-32">
      <div className=" mx-auto grid grid-cols-2 px-10 md:grid-cols-3  gap-10 justify-center items-center ">
        <PerksComp
          icon={<BsSend />}
          title="Worldwide Shipping"
          sub="Order above $100"
        />
        <PerksComp
          icon={<GiReturnArrow />}
          title="Easy 30 Days Returns"
          sub="Back return in 7 days"
        />
        <PerksComp
          icon={<FaRegThumbsUp />}
          title="Quality Support"
          sub="Praesent Pulviner Neque"
        />
        <PerksComp
          icon={<PiMoneyBold />}
          title="Money back Gurantee"
          sub="Gurantee back within 30 days"
        />
        <PerksComp
          icon={<TfiHeadphoneAlt />}
          title="Easy online Support"
          sub="Any time support"
        />
      </div>
    </div>
  );
};

export default Perks;
