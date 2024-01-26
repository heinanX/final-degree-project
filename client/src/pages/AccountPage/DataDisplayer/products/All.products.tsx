import { useState } from "react";
import { useSocket as productSocket } from "../../../../contexts/product.context";
import capitalizeLetters from "../../../../functions/capitalizeLetters";
import FormSearch from "../sharedComponents/Form.search";

interface AllProductsProps {
  displayComponent: string
}

const AllProducts = ({displayComponent}: AllProductsProps) => {
  const { products } = productSocket();

  const [showProducts, setShowProducts ] = useState<boolean>(true);

  return (
    <div className=" h-5/6 overflow-y-auto cart-scrollbar w-full p-2 text-xs">
      <FormSearch setShowState={setShowProducts} displayComponent={displayComponent} />

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
    </div>
  );
};

export default AllProducts;
