import { useState } from "react";
import formatDate from "../../../../functions/date.formatter";
import { Order } from "../../../../interfaces/order.interface";
import { Product } from "../../../../interfaces/product.interface";
import { FaSave } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import SingleOrderProducts from "./components/order/Single.order.products";
import SingleOrderReturned from "./components/order/Single.order.returned";
import SingleOrderShipped from "./components/order/Single.order.shipped";

interface ViewSingleOrderProps {
  viewDetails: Order[] | Product[];
  setViewDetails: React.Dispatch<React.SetStateAction<Order[] | Product[]>>;
}

const ViewSingleOrder = ({
  viewDetails,
  setViewDetails,
}: ViewSingleOrderProps) => {
  const [disableForm, setDisableForm] = useState<boolean>(true);
  const [ isShipped, setIsShipped ] = useState<boolean>(false)

  const handleForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log('value');
    
    setDisableForm(true)
  }

  const changeTextcolor = disableForm ? '' : 'text-white';

  return (
    <div>
      <div className="flex flex-row w-full justify-end">
        {disableForm ? (
          <button className="pb-4" onClick={() => setDisableForm(false)}>
            <FaPen />
          </button>
        ) : (
          
            <button className="pb-4 w-30 flex flex-row items-center gap-2 justify-center" onClick={(e) => handleForm(e)}>
              <p>Save</p><FaSave />
            </button>
        )}
      </div>
      {viewDetails.map((item, index) => (
        <form key={index} className="w-full text-sm flex flex-col gap-2 pb-6 text-gray-400">
          <div className="flex flex-row items-center gap-2 uppercase">
            <label className="w-20">id</label>
            <input
              type="text"
              disabled={true}
              defaultValue={(item as Order)._id}
              className="w-full standard-form-darkmode"
            />
          </div>

          <div className="flex flex-row items-center gap-2 uppercase">
            <label className="w-20">date</label>
            <input
              type="text"
              disabled={true}
              defaultValue={formatDate((item as Order).date)}
              className="w-full standard-form-darkmode"
            />
          </div>

          <div className="flex flex-row items-center gap-2 uppercase">
            <label className="w-20">cust. id</label>
            <input
              type="text"
              disabled={true}
              defaultValue={(item as Order).customer}
              className="w-full text-gray-400 standard-form-darkmode"
            />
          </div>

          <div className={`flex flex-row gap-2 uppercase ${changeTextcolor}`}>
            <label className="w-20 pt-1">address</label>
            {(item as Order).address.map((addressLine, index) => (
              <div key={index} className="flex flex-col gap-2 w-full ml-10 text-gray-400">
                <input
                  type="text"
                  disabled={disableForm}
                  defaultValue={addressLine.street}
                  className={`w-full standard-form-darkmode ${changeTextcolor}`}
                />
                <input
                  type="text"
                  disabled={disableForm}
                  defaultValue={addressLine.zip_code}
                  className={`w-full standard-form-darkmode ${changeTextcolor}`}
                />
                <input
                  key={index}
                  type="text"
                  disabled={disableForm}
                  defaultValue={addressLine.city}
                  className={`w-full standard-form-darkmode ${changeTextcolor}`}
                />
              </div>
            ))}
          </div>
              <SingleOrderProducts singleOrder={(item as Order).order} />
{/*           <div className="flex flex-col sm:flex-row gap-2 uppercase w-full">
            <label className="w-2/5 pt-1">Products</label>
            <div className="pr-5 py-2 overflow-y-auto cart-scrollbar h-40 w-full">
              {(item as Order).order.map((orderItem, index) => (
                <div
                  key={index}
                  className="flex flex-col items-end gap-2 odd:bg-teal-800 py-2"
                >
                  <div className="flex flex-row items-center justify-end gap-2 w-full">
                    <label>id</label>
                    <input
                      type="text"
                      disabled={true}
                      defaultValue={orderItem.product}
                      className="standard-form-darkmode "
                    />
                  </div>

                  <div className="flex flex-row items-center justify-end gap-2 w-full">
                    <label>qty.</label>
                    <input
                      type="text"
                      disabled={true}
                      defaultValue={orderItem.quantity}
                      className=" text-right standard-form-darkmode"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div> */}
          {(item as Order).discount ? (
            <div className="flex flex-row items-center justify-between gap-2 uppercase">
              <label>Discount</label>
              <div className="flex flex-row justify-end items-center gap-1">
                <input
                  type="text"
                  disabled={true}
                  defaultValue={(item as Order).discount}
                  className="w-32 text-right standard-form-darkmode"
                />
                <p className="w-12 text-right">.00 sek</p>
              </div>
            </div>
          ) : (
            <></>
          )}

          <div className="flex flex-row items-center justify-between gap-2 uppercase">
            <label>Order Total</label>
            <div className="flex flex-row justify-end items-center gap-1">
              <input
                type="text"
                disabled={true}
                defaultValue={(item as Order).total_price}
                className="w-32 text-right standard-form-darkmode"
              />
              <p className="w-12 text-right">.00 sek</p>
            </div>
          </div>

<SingleOrderShipped  shipped={(item as Order).shipped} disableForm={disableForm} isShipped={isShipped} setIsShipped={setIsShipped} />
{/*           <div className="flex flex-row items-center justify-between gap-2 uppercase">
            <label className="w-32">shipped</label>
            {(item as Order).shipped ? (
              <span className="text-base">
                <IoIosCheckbox />
              </span>
            ) : (
              <span className="text-base">
                <MdOutlineCheckBoxOutlineBlank />
              </span>
            )}
          </div> */}
          <SingleOrderReturned returned={(item as Order).returned} disableForm={disableForm} />
{/*           <div className="flex flex-row items-center justify-between gap-2 uppercase">
            <label className="w-32">returned</label>
            { disableForm ? (item as Order).returned ? (
              <span className="text-base">
                <IoIosCheckbox />
              </span>
            ) : (
              <span className="text-base">
                <MdOutlineCheckBoxOutlineBlank />
              </span>
            ) : (
              <input type="checkbox" />
            )}
          </div> */}

          <div className="flex flex-row items-center gap-2 uppercase">
            <label className="w-40">Payment Status</label>
            <input
              type="text"
              disabled={true}
              defaultValue={(item as Order).payment_status}
              className="w-full standard-form-darkmode"
            />
          </div>

          <div className="flex flex-row items-center gap-2 uppercase">
            <label className="w-40">Order Status</label>
            <input
              type="text"
              disabled={true}
              defaultValue={(item as Order).order_status}
              className="w-full text-left standard-form-darkmode"
            />
          </div>
        </form>
      ))}

      <div className="flex flex-row w-full justify-end gap-4">
        <button className="standard-btn" onClick={() => setViewDetails([])}>
          edit
        </button>
        <button className="standard-btn" onClick={() => setViewDetails([])}>
          return
        </button>
      </div>
    </div>
  );
};

export default ViewSingleOrder;
