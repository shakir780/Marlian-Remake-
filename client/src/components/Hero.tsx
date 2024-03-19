import HeroBg from "../assets/Hero.jpeg";
const Hero = () => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${HeroBg})`,
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        display: "flex",

        alignItems: "center",
      }}
      className="h-[90vh]  justify-center  md:justify-start "
    >
      <div className="text-white flex flex-col gap-8 capitalize px-10">
        <span className="text-2xl md:text-5xl font-semibold opacity-85   ">
          Trendy Africans <br /> Clothing
        </span>
        <span className="text-md md:text-xl opacity-80">
          Up to 50% off Best selling at $150.00
        </span>
        <span className="bg-slate-950 px-4 py-1 w-fit opacity-80">
          shop now
        </span>
      </div>
    </div>
  );
};

export default Hero;
