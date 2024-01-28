import { useSocket as productSocket } from "../../../../../../contexts/product.context";
import { Product } from "../../../../../../interfaces/product.interface";
import ProductDigitalAvailable from "./Product.Digital.available";

interface ProductDigitalProps {
  disableForm: boolean;
  newDigitalAvailable: boolean
  setNewDigitalAvailable: React.Dispatch<React.SetStateAction<boolean>>;
}

/* COMPONENT THAT RENDERS DETAILS ABOUT DIGITAL VERSION OF A MOVIE 
- ie. price, ids, and availability*/

const ProductDigital = ({ disableForm, newDigitalAvailable, setNewDigitalAvailable }: ProductDigitalProps) => {
  const { viewProductDetails } = productSocket(); //destructs state from product context

  //states to hold updated values if they're edited.


  return (
    <div>
      <h2 className="p-1">DIGITAL:</h2>
      <div className="bg-teal-950 p-2 rounded flex flex-col gap-2">

        {/* price */}
        <div className="flex flex-row items-center justify-between gap-2 uppercase">
          <label>price</label>
          <div className="flex flex-row justify-end items-center gap-1">
            <input
              type="text"
              disabled={disableForm}
              defaultValue={(viewProductDetails as Product).digital.price}
              className="w-32 text-right standard-form-darkmode"
            />
            <p className="w-12 text-right">.00 sek</p>
          </div>
        </div>

        {/* availability checkbox */}
        <ProductDigitalAvailable
          available={(viewProductDetails as Product).digital.available}
          disableForm={disableForm}
          newDigitalAvailable={newDigitalAvailable}
          setNewDigitalAvailable={setNewDigitalAvailable}
        />

        {/* stripe price id */}
        <div className="flex flex-row items-center gap-2 uppercase">
          <label className="w-40">stripe price id</label>
          <input
            type="text"
            disabled={true}
            defaultValue={
              (viewProductDetails as Product).digital.stripe_price_id
            }
            className="w-full text-right standard-form-darkmode"
          />
        </div>

        {/* stripe product id */}
        <div className="flex flex-row items-center gap-2 uppercase">
          <label className="w-40">stripe id</label>
          <input
            type="text"
            disabled={true}
            defaultValue={
              (viewProductDetails as Product).digital.stripe_prod_id
            }
            className="w-full text-right standard-form-darkmode"
          />
        </div>

      </div>
    </div>
  );
};

export default ProductDigital;
