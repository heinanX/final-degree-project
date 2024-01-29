import { useSocket as productSocket } from "../../../../../contexts/product.context";
import { Product } from "../../../../../interfaces/product.interface";

interface ProductTagsProps {
  disableForm: boolean;
}

const ProductTags = ({ disableForm }: ProductTagsProps) => {
  const { viewProductDetails } = productSocket();

  return (
    <>
      <div className="flex flex-col xl:flex-row justify-between gap-2 uppercase">
        <label className="w-40">tags id</label>
        <div className="flex flex-row gap-4 flex-wrap justify-end">
        {(viewProductDetails as Product).tags.map((tag, index) => (
          <input
            key={index}
            type="text"
            disabled={disableForm}
            defaultValue={tag}
            className="standard-form-darkmode"
          />

        ))}
        </div>
      </div>
    </>
  );
};

export default ProductTags;
