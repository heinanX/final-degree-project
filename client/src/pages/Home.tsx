//import Hero from "../main_components/Hero";
import ProductForm from '../components/productForm';
import { useSocket as useSocketProducts } from '../contexts/productContext';

const Home = () => {
  const { getProducts} = useSocketProducts()
  return (
    <>
      {/* <Hero /> */}
      <button onClick={getProducts} className="mt-60 bg-white">click me</button>
      <ProductForm />
    </>
  );
};

export default Home;
