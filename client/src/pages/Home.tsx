import Hero from "../components/Hero";
import NewProducts from "../components/NewProducts";
import OurClient from "../components/OurClient";
import Perks from "../components/Perks";
import PopularProducts from "../components/PopularProducts";
import Welcome from "../components/Welcome";

const Home = () => {
  return (
    <div>
      <Hero />
      <Welcome />
      <PopularProducts />
      <NewProducts />
      <OurClient />
      <Perks />
    </div>
  );
};

export default Home;
