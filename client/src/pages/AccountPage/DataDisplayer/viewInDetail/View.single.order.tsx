import { useState } from "react";
import formatDate from "../../../../functions/date.formatter";
import { Order } from "../../../../interfaces/order.interface";
import { Product } from "../../../../interfaces/product.interface";
import { FaSave } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import SingleOrderProducts from "./components/order/Single.order.products";
import SingleOrderReturned from "./components/order/Single.order.returned";
import SingleOrderShipped from "./components/order/Single.order.shipped";
import SingleOrderDiscount from "./components/order/Single.order.discount";
import SingleOrderAddress from "./components/order/Single.order.address";

interface ViewSingleOrderProps {
  viewDetails: Order[] | Product[];
  setViewDetails: React.Dispatch<React.SetStateAction<Order[] | Product[]>>;
}

const ViewSingleOrder = ({
  viewDetails,
  setViewDetails,
}: ViewSingleOrderProps) => {
  const [disableForm, setDisableForm ] = useState<boolean>(true);
  const [isShipped, setIsShipped ] = useState<boolean>(false);
  const [isReturned, setIsReturned ] = useState<boolean>(false);
  const [ newStreet, setNewStreet ] = useState<string>('');
  const [ newZipCode, setNewZipCode ] = useState<string>('');
  const [ newCity, setNewCity ] = useState<string>('');

  const handleForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log("value");
    console.log(newStreet);
    console.log(newZipCode);
    console.log(newCity);
  setDisableForm(true)
  };

  return (
    <div>
      <div className="flex flex-row w-full justify-end">
        {disableForm ? (
          <button className="pb-4" onClick={() => setDisableForm(false)}>
            <FaPen />
          </button>
        ) : (
          <button
            className="pb-4 w-30 flex flex-row items-center gap-2 justify-center"
            onClick={(e) => handleForm(e)}
          >
            <p>Save</p>
            <FaSave />
          </button>
        )}
      </div>
      {viewDetails.map((item, index) => (
        <form
          key={index}
          className="w-full text-sm flex flex-col gap-2 pb-6 text-gray-400"
        >
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

          <SingleOrderAddress address={(item as Order).address}
              setNewStreet={setNewStreet}
              setNewZipCode={setNewZipCode}
              setNewCity={setNewCity}
              disableForm={disableForm}
          />

          <SingleOrderProducts singleOrder={(item as Order).order} />

          <SingleOrderDiscount discount={(item as Order).discount} />



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

          <SingleOrderShipped
            shipped={(item as Order).shipped}
            disableForm={disableForm}
            isShipped={isShipped}
            setIsShipped={setIsShipped}
          />

          <SingleOrderReturned
            returned={(item as Order).returned}
            disableForm={disableForm}
            isReturned={isReturned}
            setIsReturned={setIsReturned}
          />

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
          return
        </button>
      </div>
    </div>
  );
};

export default ViewSingleOrder;
