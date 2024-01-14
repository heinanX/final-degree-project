//import ProductForm from '../../components/ProductForm/ProductForm';
import { useEffect, useState } from "react";
import Hero from "../../Components/Hero";
import Navigation from "./components/Navigation";
import Shelf from "./components/Shelf";
import { useSocket as useSocketProducts } from "../../contexts/product.context";
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
    console.log(windowSize);
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
      <Shelf  arr={fantasy} category={'Fantasy'} windowSize={windowSize} />
    </>
  );
};

export default Home;
