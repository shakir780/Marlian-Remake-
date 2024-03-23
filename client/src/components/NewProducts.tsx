import React from "react";
import img1 from "../assets/2aiexDIP0PEuEDh0_kidssweaterorange_400x.jpg";
import img2 from "../assets/bJMvrYGrJRFL5W7b_Mens-Ireti-African-Print-Color-Blocked-Button-Up-Shirt-Black-Red-Kente-1_400x.jpg";
import img3 from "../assets/comPtDZsokx7tdik_african-shift-dress-in-black-dashiki-890854_270x360_crop_center.jpg";
import img4 from "../assets/uNlh9LJ0xwJERddV_african-t-shirt-in-blue-kente-207063_270x360_crop_center.jpg";

const NewProducts = () => {
  return (
    <div className="max-w-[1460px] h-fit py-32 mx-auto flex flex-col gap-10 justify-center items-center ">
      <div className="flex flex-col items-center gap-6">
        <span className="capitalize text-3xl md:text-4xl ">New Products</span>
        <div className="w-20 h-1 bg-black" />
      </div>

      <div className="md:flex hidden ">
        <img src={img1} className="w-[280px] h-[280px] object-cover" alt="" />
        <img src={img2} className="w-[280px] h-[280px] object-cover" alt="" />
        <img src={img3} className="w-[280px] h-[280px] object-cover" alt="" />
        <img src={img4} className="w-[280px] h-[280px] object-cover" alt="" />
      </div>
    </div>
  );
};

export default NewProducts;
