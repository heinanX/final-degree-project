import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket as productSocket } from "../../contexts/product.context";
import ProductImage from "./ProductImage/Product.image";
import Shelf from "../Home/components/Shelf";
import useWindowSize from "../../customHooks/windowSize";
import ProductDetails from "./ProductDetails/Product.details";
import { Product } from "../../interfaces/product.interface";

/* PRODUCT PAGE */

const ProductPage = () => {
  const [loadedProduct, setLoadedProduct] = useState<Product | null | void>(
    null
  );
  const { getProductById, relatedProducts } = productSocket();
  const { id } = useParams();
  const windowSize = useWindowSize();

  useEffect(() => {
    if (id) {
      const fetchedProduct = async () => {
        const product = await getProductById(id);
        setLoadedProduct(product);
      };
      fetchedProduct();
      window.scrollTo(0, 0);
    }
  }, [id]);

  return (
    <div className="w-full max-w-7xl flex flex-col py-40">
      <div className=" flex flex-row ">
        <ProductImage loadedProduct={loadedProduct} />
        <ProductDetails loadedProduct={loadedProduct} />
      </div>

      {/* Related Titles Shelf Section utilizing Shelf component*/}
      {relatedProducts.length > 0 ? (
        <div className="py-4">
          <Shelf
            arr={relatedProducts} // provides array with movies
            category={"Related titles"} // provides title for shelf label
            windowSize={windowSize} // provides windowSize hook
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProductPage;
