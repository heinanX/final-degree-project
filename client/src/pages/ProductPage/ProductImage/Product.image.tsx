//import { useSocket as productSocket } from "../../../contexts/product.context";

import { Product } from "../../../interfaces/product.interface";

/* COMPONENT THAT RENDERS LEFT SIDE OF PRODUT PAGE
  - it displays an image */

interface ProperImageProp {
  loadedProduct: void | Product | null
}

const ProductImage = ( {loadedProduct}: ProperImageProp) => {
  return (
    <>
      <div className="w-1/2 flex justify-center py-4">
        <img
          data-info="Movie-image"
          src={loadedProduct?.image}
          alt={loadedProduct?.title}
          className="h-3/4"
        />
      </div>
    </>
  );
};

export default ProductImage;
