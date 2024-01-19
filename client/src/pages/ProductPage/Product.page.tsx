import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket as productSocket } from "../../contexts/product.context";
import RightPanel from "./Components/Right.panel";
import LeftPanel from "./Components/Left.panel";
import Shelf from "../Home/components/Shelf";
import useWindowSize from "../../customHooks/windowSize";

const ProductPage = () => {
  const [loadProduct, setLoadProduct] = useState(true);
  const { getProduct, getMovie, products } = productSocket();

  const { id } = useParams();
  const windowSize = useWindowSize();

  useEffect(() => {
    if (id) {
      console.log(id);
      
    getProduct(id);
    window.scrollTo(0, 0);
  }
  }, [id]);

  useEffect(() => {
    setLoadProduct(false);
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
