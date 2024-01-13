//import ProductForm from '../../components/ProductForm/ProductForm';

import Hero from "../../Components/Hero";
import Products from "./components/Products";
import Navigation from "./components/navigation";

const Home = () => {

  return (
    <>
      <Hero />
      <Navigation />
      {/* <ProductForm /> */}
      <Products />
    </>
  );
};

export default Home;
