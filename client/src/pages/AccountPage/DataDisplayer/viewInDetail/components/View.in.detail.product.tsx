import { useEffect, useState } from "react";
import { useSocket as productSocket } from "../../../../../contexts/product.context";
import { Product } from "../../../../../interfaces/product.interface";
import EditForm from "../../_sharedComponents/Edit.form";
import ProductDigital from "./product/Product.Digital";
import ProductVhs from "./product/Product.vhs";
import ViewInDetailCancelBtn from "../../_sharedComponents/view.in.detail.cancelBtn";
import ProductCategories from "./Product.categories";
import ProductTags from "./Product.tags";

interface ViewInDetailProductProps {
  disableForm: boolean;
  setDisableForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const ViewInDetailProduct = ({
  disableForm,
  setDisableForm,
}: ViewInDetailProductProps) => {
  const { viewProductDetails, updateProduct, newUpdatedProduct, setNewUpdatedProduct } = productSocket();

  const [newVhs, setNewVhs] = useState<Partial<Product['vhs']>>({
    price: (viewProductDetails as Product).vhs.price,
    available: (viewProductDetails as Product).vhs.available,
    quantity: (viewProductDetails as Product).vhs.quantity,
    inStock: (viewProductDetails as Product).vhs.inStock,
    stripe_price_id: (viewProductDetails as Product).vhs.stripe_price_id,
    stripe_prod_id: (viewProductDetails as Product).vhs.stripe_prod_id,
  });

  const [newDigital, setNewDigital] = useState<Partial<Product['digital']>>({
    price: (viewProductDetails as Product).vhs.price,
    available: (viewProductDetails as Product).vhs.available,
    stripe_price_id: (viewProductDetails as Product).vhs.stripe_price_id,
    stripe_prod_id: (viewProductDetails as Product).vhs.stripe_prod_id,
  });

  const handleProductForm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setDisableForm(true);
    console.log("its done");

    //updateOrderDatabase(updateProductObject, (viewProductDetails as Product)._id);
  };

  useEffect(() => {
    console.log(newUpdatedProduct);
  }, [newUpdatedProduct]);

  useEffect(() => {
    setNewUpdatedProduct((prev) => ({...prev, vhs: newVhs, digital: newDigital}))
  }, [newVhs, newDigital]);

  return (
    <>
      {/* EDIT FORM COMPONENT */}
      <EditForm
        disableForm={disableForm}
        setDisableForm={setDisableForm}
        handleForm={handleProductForm}
      />
      <div className="py-2">
        <form
          id="ViewInDetailProduct"
          className="w-full text-sm flex flex-col gap-2  pr-4 text-gray-400 overflow-y-auto primary-scrollbar"
        >
          <div className="flex flex-row items-center gap-2 uppercase">
            <label className="w-20">id</label>
            <input
              type="text"
              disabled={true}
              defaultValue={(viewProductDetails as Product)._id}
              className="w-full standard-form-darkmode"
            />
          </div>

          <div className="flex flex-row items-center gap-2 uppercase">
            <label className="w-20">title</label>
            <input
              type="text"
              disabled={disableForm}
              defaultValue={(viewProductDetails as Product).title}
              onChange={(e) => updateProduct(e, 'title')}
              className="w-full standard-form-darkmode"
            />
          </div>

          <ProductVhs
            disableForm={disableForm}
            newVhs={newVhs}
            setNewVhs={setNewVhs}
          />

          <ProductDigital
            disableForm={disableForm}
            newDigital={newDigital}
            setNewDigital={setNewDigital}
          />

          <div className="flex flex-col gap-2 uppercase">
            <label className="w-20">description</label>
            <textarea
              rows={8}
              disabled={disableForm}
              onChange={(e) => updateProduct(e, 'description')}
              defaultValue={(viewProductDetails as Product).description}
              className="w-full text-gray-400 pr-2 standard-form-darkmode secondary-scrollbar resize-none"
            />
          </div>

          {/* CATEGORIES */}
          <ProductCategories disableForm={disableForm} />

          {/* TAGS */}

          <ProductTags disableForm={disableForm} />

          <div className="flex flex-row items-center gap-2 uppercase ">
            <label className="w-40">cont. Rating</label>
            <input
              type="text"
              disabled={disableForm}
              onChange={(e) => updateProduct(e, 'content_rating')}
              defaultValue={(viewProductDetails as Product).content_rating}
              className="w-full standard-form-darkmode"
            />
          </div>

          <div className="flex flex-row items-center gap-2 uppercase">
            <label className="w-40">Year</label>
            <input
              type="text"
              disabled={disableForm}
              onChange={(e) => updateProduct(e, 'year')}
              defaultValue={(viewProductDetails as Product).year}
              className="w-full text-left standard-form-darkmode"
            />
          </div>

          <div className="flex flex-row items-center gap-2 uppercase">
            <label className="w-40">Image</label>
            <input
              type="text"
              disabled={disableForm}
              onChange={(e) => updateProduct(e, 'image')}
              defaultValue={(viewProductDetails as Product).image}
              className="w-full text-left standard-form-darkmode"
            />
          </div>
        </form>

        <ViewInDetailCancelBtn />
      </div>
    </>
  );
};

export default ViewInDetailProduct;
