//import { useEffect } from "react";
//import { useSocket as useSocketProducts } from "../../../contexts/product.context";
import FantasySection from "./Fantasy.section";
import ThrowBacksSection from "./ThrowBacks.section";
import HotRentalsSection from "./Hot.rental.section";
import NewsSection from "./News.section";
import AdSpaceHome from "./AdSpace.home";

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
    <div className="w-full  bg-slate-400 py-20">
      <NewsSection />
      <HotRentalsSection />
      <AdSpaceHome />
      <ThrowBacksSection />
      <FantasySection />
    </div>
  );
};

export default Products;
