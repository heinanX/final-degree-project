import { useSocket as productSocket } from "../../../../../../contexts/product.context";
import { Product, iProductVhs } from "../../../../../../interfaces/product.interface";
import ProductVhsAvailable from "./Product.vhs.available";

interface ProductVhsProps {
  disableForm: boolean;
  newVhs: Partial<iProductVhs>;
  setNewVhs: React.Dispatch<React.SetStateAction<Partial<iProductVhs>>>
}

/* COMPONENT THAT RENDERS DETAILS ABOUT VHS VERSION OF A MOVIE 
- ie. price, quantity, current stock, ids, and availability*/

const ProductVhs = ({ disableForm, newVhs, setNewVhs }: ProductVhsProps) => {
  const { viewProductDetails } = productSocket();

  return (
    <div>
      <h2 className="p-1">VHS:</h2>
      <div className="bg-teal-950 p-2 rounded flex flex-col gap-2">
        
        {/* price */}
        <div className="flex flex-row items-center justify-between gap-2 uppercase">
          <label>price</label>
          <div className="flex flex-row justify-end items-center gap-1">
            <input
              type="text"
              disabled={disableForm}
              defaultValue={(viewProductDetails as Product).vhs.price}
              className="w-32 text-right standard-form-darkmode"
            />
            <p className="w-12 text-right">.00 sek</p>
          </div>
        </div>

        {/* availability checkbox */}
        <ProductVhsAvailable
          available={(viewProductDetails as Product).vhs.available}
          disableForm={disableForm}
          newVhs={newVhs}
          setNewVhs={setNewVhs}
        />

        {/* stock */}
        <div className="flex flex-row items-center gap-2 uppercase">
          <label className="w-40">stock</label>
          <input
            type="text"
            disabled={disableForm}
            defaultValue={(viewProductDetails as Product).vhs.quantity}
            className="w-full text-right standard-form-darkmode"
          />
        </div>

        {/* in stock */}
        <div className="flex flex-row items-center gap-2 uppercase">
          <label className="w-40">In stock</label>
          <input
            type="text"
            disabled={disableForm}
            defaultValue={(viewProductDetails as Product).vhs.inStock}
            className="w-full text-right standard-form-darkmode"
          />
        </div>

        {/* stripe price id */}
        <div className="flex flex-row items-center gap-2 uppercase">
          <label className="w-40">stripe id</label>
          <input
            type="text"
            disabled={disableForm}
            defaultValue={(viewProductDetails as Product).vhs.stripe_price_id}
            className="w-full text-right standard-form-darkmode"
          />
        </div>

        {/* stipe product id */}
        <div className="flex flex-row items-center gap-2 uppercase">
          <label className="w-40">stripe price id</label>
          <input
            type="text"
            disabled={true}
            defaultValue={(viewProductDetails as Product).vhs.stripe_prod_id}
            className="w-full text-right standard-form-darkmode"
          />
        </div>

      </div>
    </div>
  );
};

export default ProductVhs;
