import { useSocket as productSocket } from "../../../../../contexts/product.context";
import { Product } from "../../../../../interfaces/product.interface";

interface ProductCategoriesProps {
  disableForm: boolean;
}

/* COMPONENT THAT RENDERS CATEGORIES INSIDE PRODUCT FORM */

const ProductCategories = ({ disableForm }: ProductCategoriesProps) => {
  const { viewProductDetails } = productSocket();

  return (
    <>
      <div className="flex flex-col xl:flex-row justify-between gap-2 uppercase">
        <label className="w-40">category id</label>
        <div className="flex flex-row gap-4 flex-wrap justify-end">
        {(viewProductDetails as Product).category.map((category, index) => (
          <input
            key={index}
            type="text"
            disabled={disableForm}
            //@ts-expect-error: it is a string 
            defaultValue={category}
            className="standard-form-darkmode"
          />

        ))}
        </div>
      </div>
    </>
  );
};

export default ProductCategories;
