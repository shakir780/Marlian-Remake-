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
      className="h-[50vh] lg:h-fit py-32  justify-start "
    >
      <div className="mt-16 text-white flex flex-col gap-2 lg:gap-8 capitalize px-3 lg:px-10">
        <span className="text-xl lg:text-5xl font-semibold opacity-85   ">
          Trendy Africans <br /> Clothing
        </span>
        <span className="text-sm lg:text-xl opacity-80">
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
