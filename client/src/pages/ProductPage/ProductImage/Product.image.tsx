import { Product } from "../../../interfaces/product.interface";

/* COMPONENT THAT RENDERS IMAGE ON LEFT SIDE OF PRODUCT PAGE */

interface ProperImageProp {
  loadedProduct: void | Product | null;
}

const ProductImage = ({ loadedProduct }: ProperImageProp) => {
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
