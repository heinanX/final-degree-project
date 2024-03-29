/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useSocket as productSocket } from "../../../../contexts/product.context";
import FormSearch from "../_sharedComponents/Form.search";
import ProductOverview from "../ProductsOverview/ProductOverview";

interface AllProductsProps {
  displayComponent: string;
}

/* COMPONENT THAT RENDERS ALL PRODUCTS FROM DATABASE */

const AllProducts = ({ displayComponent }: AllProductsProps) => {
  const { products, setViewProductDetails, setNewUpdatedProduct } = productSocket(); //Destructures functions from productSocket

  const [showProducts, setShowProducts] = useState<boolean>(true); //state to manage whether to show products or not

  return (
    <div className=" h-5/6 overflow-y-auto primary-scrollbar w-full p-2 text-xs">
      {/* renders 'search form' component with props */}
      <FormSearch
        setShowState={setShowProducts}
        displayComponent={displayComponent}
      />

      {/* if array contains products it maps through array and renders out  */}
      {showProducts ? (
        products.map((productItem, index) => (
          <div
            key={index}
            onClick={() => {setViewProductDetails(productItem)
              const { _id, vhs, digital, ...productWithoutId } = productItem;
            setNewUpdatedProduct(productWithoutId)}}
            className="flex flex-row items-center pb-2 odd:bg-teal-900"
          >
            {/* renders component for each productItem and passes it as a prop */}
            <ProductOverview productItem={productItem} />
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default AllProducts;
