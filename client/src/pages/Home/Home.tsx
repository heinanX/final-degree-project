import { useEffect, useState } from "react";
import { useSocket as productSocket } from "../../contexts/product.context";
import { useSocket as cartSocket } from "../../contexts/cart.context";
import Navigation from "./components/Navigation";
import Hero from "../../Components/Hero";
import Shelf from "./components/Shelf";
import Greeting from "./components/Greeting";
import AdSpaceHome from "./components/AdSpace.home";

/* HOME COMPONENT, REPRESENTING MAIN PAGE OF THE APPLICATION */

const Home = () => {
  // Extracting necessary functions and state from cart and product contexts
  const { setInitCart } = cartSocket();
  const { products } = productSocket();

  const throwbacks = products.filter((product) => product.year <= 1990);
  //@ts-expect-error: product.category is an array with string ids so the comparison is valid.
  const fantasy = products.filter((product) => product.category.some((cat) => cat === '65942dbca98e20eab412592b'));
  
  const recentlyAdded = products.slice(0, 5);

  // Creating a shuffled copy of the products array
  const copyProductArr = [...products];
  const shuffled = copyProductArr.sort(() => Math.random() - 0.5);

  // State for tracking window size changes
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Function to handle window resize events
  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    setInitCart();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowSize]);


  return (
    <>
      {/* Hero section with a dynamic carousel */}
      <Hero />

      <Navigation />

      <div className="w-full max-w-7xl flex flex-col gap-10">
        <Shelf arr={recentlyAdded} category={"Recently Added"} windowSize={windowSize} />

        <Greeting />

        <Shelf arr={shuffled} category={"Hot Rentals"} windowSize={windowSize} />

        <Shelf arr={fantasy} category={"Fantasy"} windowSize={windowSize} />

        <Shelf arr={throwbacks} category={"ThrowBacks"} windowSize={windowSize} />

        <AdSpaceHome />
      </div>
    </>
  );
};

export default Home;
