import WelcomePic from "../assets/pexels-photo-935985.webp";

const Welcome = () => {
  return (
    <>
      <div className="h-[100vh] md:h-fit py-32 flex md:flex-row flex-col gap-7 mt-20 md:mt-0 px-4 justify-around items-center">
        <div>
          <div className="flex flex-col gap-11 items-center">
            <div className="flex flex-col items-center gap-6">
              <span className="capitalize text-3xl md:text-4xl ">
                Welcome to our Store
              </span>
              <div className="w-20 h-1 bg-black" />
            </div>
            <div>
              <span className="text-gray-500 text-center ">
                Marlian is a black-owned, ready-to-wear bold print clothing line
                <br />
                offering quality, trendy African inspired fashion at affordable
                prices. <br />
                Marlian helps you celebrate the vibrant African culture, <br />
                and feel connected to your roots with every garment.
              </span>
            </div>
            <span className="bg-black text-white cursor-pointer px-4 py-2 w-fit opacity-80 uppercase">
              Read More
            </span>
          </div>
        </div>
        <div>
          <img className="w-[400px] h-[300px] object-cover" src={WelcomePic} />
        </div>
      </div>
    </>
  );
};

export default Welcome;
