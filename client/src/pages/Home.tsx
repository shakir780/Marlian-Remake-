import Companies from "../components/Companies";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";
import GetApp from "../components/GetApp";
import Hero from "../components/Hero";
import NewProducts from "../components/NewProducts";
import OurClient from "../components/OurClient";
import Perks from "../components/Perks";
import Welcome from "../components/Welcome";

const Home = () => {
  return (
    <div>
      <Hero />
      <Welcome />
      <NewProducts />
      <OurClient />
      <Perks />
      <FeaturedProducts />
      <GetApp />
      <Companies />
      <Footer />
    </div>
  );
};

export default Home;
