import { useState } from "react";
import { useSocket as productSocket } from "../../../../contexts/product.context";
import capitalizeLetters from "../../../../functions/capitalizeLetters";

const AllProducts = () => {
  const { products } = productSocket();

  const [showProducts, setShowProducts ] = useState<boolean>(true);

  return (
    <div className=" h-5/6 overflow-y-auto cart-scrollbar w-full p-2 text-xs">
      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col md:flex-row gap-2 w-11/12 md:w-full justify-center pb-5">
        <input type="text" placeholder="search product" className="text-black rounded px-2 py-1 md:py-0"/>
        <button className="standard-btn" onClick={() => setShowProducts(false)}>Look up</button>
        <button className="standard-btn" onClick={()=> setShowProducts(true)}>Show all products</button>
      </form>
      {showProducts ? products.map((item, index) => (
        <div key={index} className="flex flex-row items-center pb-2 odd:bg-teal-900">
          <img src={item.image} alt="" className="w-12" />
          <ul className="flex flex-col lg:flex-row justify-between mb-2 p-2 w-full text-base md:text-xs">
            <li className="w-full lg:w-1/3 pr-5">{capitalizeLetters(item.title)}</li>
            <li className="w-full lg:w-1/3 text-gray-400">id: {item._id}</li>
            <li className="w-full lg:w-1/3 lg:text-right lg:pr-2 flex gap-2">
              <p>VHS: {item.vhs.price}:-</p>
              <p>Digital: {item.digital.price}:-</p>
            </li>
          </ul>
        </div>
      )) : <></>}
      {/* {products.map((item, index) => (
        <div key={index} className="flex flex-row items-center pb-2">
          <img src={item.image} alt="" className="w-12" />
          <ul className="flex flex-col lg:flex-row justify-between mb-2 p-2 w-full text-base md:text-xs odd:bg-teal-800">
            <li className="w-full lg:w-1/3 pr-5">{capitalizeLetters(item.title)}</li>
            <li className="w-full lg:w-1/3 text-gray-400">id: {item._id}</li>
            <li className="w-full lg:w-1/3 lg:text-right lg:pr-2 flex gap-2">
              <p>VHS: {item.vhs.price}:-</p>
              <p>Digital: {item.digital.price}:-</p>
            </li>
          </ul>
        </div>
      ))} */}
    </div>
  );
};

export default AllProducts;
