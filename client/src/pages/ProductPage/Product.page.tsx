import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSocket as productSocket } from "../../contexts/product.context";
import RightPanel from "./Components/Right.panel";
import LeftPanel from "./Components/Left.panel";
import Shelf from "../Home/components/Shelf";
import useWindowSize from "../../customHooks/windowSize";

const ProductPage = () => {
  const [loadProduct, setLoadProduct] = useState(true);
  const { getProduct, getMovie, products } = productSocket();

  const windowSize = useWindowSize();
  const location = useLocation();
  const movieID = location.pathname.slice(1);
  useEffect(() => {
    getProduct(movieID);
  }, []);

  useEffect(() => {
    setLoadProduct(false);
    console.log(getMovie);
  }, [getMovie]);

  return (
    <div className="w-full max-w-7xl flex flex-col py-40">
     <div className=" flex flex-row " >
     {loadProduct ? (
        <p>loading</p>
      ) : (
        <>
          <LeftPanel />
          <RightPanel />
        </>
      )}
     </div>
        <div className="py-4">
        <Shelf arr={products} category={"Related titles"} windowSize={windowSize} />
        </div>

    </div>
  );
};

export default ProductPage;
