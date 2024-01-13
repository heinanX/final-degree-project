//import { useEffect } from "react";
//import { useSocket as useSocketProducts } from "../../../contexts/product.context";
import FantasySection from "./Fantasy.section";
import ThrowBacksSection from "./ThrowBacks.section";
import HotRentalsSection from "./Hot.rental.section";
import RecentlyAddedSection from "./Recently.added.section";
import AdSpaceHome from "./AdSpace.home";
import Greeting from "./Greeting";

const Products = () => {
  //flex gap-2 flex-wrap
  // const { products } = useSocketProducts();
  // {products.map((item, index) => (
  //   <div key={index} className="">
  //     {/* <p>{item.title}</p> */}
  //     <img src={item.image} className="w-40" />
  //   </div>
  // ))}

  return (
    <div className="w-full py-5">

      <RecentlyAddedSection />
      <HotRentalsSection />
      <Greeting />
      <ThrowBacksSection />
      <FantasySection />
      <AdSpaceHome />
    </div>
  );
};

export default Products;
