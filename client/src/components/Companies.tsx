import Company1 from "../assets/1-130x87.png";
import Company2 from "../assets/3-130x87.png";
import Company4 from "../assets/4-130x87.png";
import Company5 from "../assets/5-130x87.png";
import Company6 from "../assets/6-130x87.png";
import Company7 from "../assets/7-130x87.png";
const Companies = () => {
  return (
    <div className="h-fit py-20">
      <div className="flex flex-wrap gap-8 justify-evenly">
        <img className="object-cover" src={Company1} alt="" />
        <img className="object-cover" src={Company2} alt="" />
        <img className="object-cover" src={Company4} alt="" />
        <img className="object-cover" src={Company5} alt="" />
        <img className="object-cover" src={Company6} alt="" />
        <img className="object-cover" src={Company7} alt="" />
      </div>
    </div>
  );
};

export default Companies;
