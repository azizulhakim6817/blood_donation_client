import Banner from "../Banner/Banner";
import Contact from "../Contact/Contact";
import DonorSlider from "../DonorSlider/DonorSlider";

import Featured from "../Featured/Featured";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Featured></Featured>
      <DonorSlider></DonorSlider>
      <Contact></Contact>
    </div>
  );
};

export default Home;
