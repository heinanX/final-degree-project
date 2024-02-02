import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket as productSocket } from "../../contexts/product.context";
import RightPanel from "./Components/Right.panel";
import LeftPanel from "./Components/Left.panel";
import Shelf from "../Home/components/Shelf";
import useWindowSize from "../../customHooks/windowSize";

/* PRODUCT PAGE */

const ProductPage = () => {
  const [loadProduct, setLoadProduct] = useState(true);
  const { getProductById, getMovie, relatedProducts } = productSocket();
  const { id } = useParams();
  const windowSize = useWindowSize();

  // Effect to load product details when the 'id' parameter changes
  useEffect(() => {
    if (id) {
      setLoadProduct(true);
      getProductById(id);
      window.scrollTo(0, 0);
    }
  }, [id]);

  // Effect to update the loading state when 'getMovie' changes
  useEffect(() => {
    setLoadProduct(false);
  }, [getMovie]);

  return (
    <div className="w-full max-w-7xl flex flex-col py-40">
      <div className=" flex flex-row ">
        {/* Conditional render that displays loading message while fetching product */}
        {loadProduct ? (
          <p>Loading...</p>
        ) : (
          <>
            {/* LeftPanel and RightPanel components */}
            <LeftPanel />
            <RightPanel />
          </>
        )}
      </div>

      {/* Related Titles Shelf Section utilizing Shelf component*/}
      {relatedProducts.length > 0 ? (
        <div className="py-4">
          <Shelf
            arr={relatedProducts} // Provides array with movies
            category={"Related titles"} // Provides title for shelf label
            windowSize={windowSize} // Provides windowSize hook
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProductPage;
