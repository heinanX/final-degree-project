//import ProductForm from '../../components/ProductForm/ProductForm';
import { useEffect, useState } from "react";
import Hero from "../../Components/Hero";
import Navigation from "./components/Navigation";
import Shelf from "./components/Shelf";
import { useSocket as useSocketProducts } from "../../contexts/product.context";
import Greeting from "./components/Greeting";
import AdSpaceHome from "./components/AdSpace.home";
//import Products from "./components/Products";

const Home = () => {

  const { products } = useSocketProducts();
  const fantasy = products.slice(5,10)

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    // Event listener for window resize
    window.addEventListener('resize', handleResize);
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, [windowSize]);

  return (
    <>
      <Hero />
      <Navigation />
      {/* <ProductForm /> */}
      {/* <Products /> */}
      <Shelf  arr={products} category={'Recently Added'} windowSize={windowSize} />
      <Shelf  arr={fantasy} category={'Hot Rentals'} windowSize={windowSize} />
      <Greeting />
      <Shelf  arr={fantasy} category={'Fantasy'} windowSize={windowSize} />
      <Shelf  arr={fantasy} category={'ThrowBacks'} windowSize={windowSize} />
      <AdSpaceHome />
    </>
  );
};

export default Home;
