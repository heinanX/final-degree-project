import { LiaShippingFastSolid } from "react-icons/lia";
import { useSocket as orderSocket } from "../../../contexts/order.context";
import { NavLink } from "react-router-dom";

/* A COMPONENET FOR DISPLAYING ORDER CONFIRMATION DETAILS */

const OrderDetails = () => {
  // Extracting order information from the order context
  const { order } = orderSocket();

  return (
    <>
      <div className="flex flex-col items-center text-white font-notoSans text-center px-10 sm:px-20">
        <span className="text-9xl text-vhsYellow">
          <LiaShippingFastSolid />
        </span>
        <h1 className="font-bold text-3xl md:text-4xl">Thank You For Your Order!</h1>
        <p className="text-sm pt-1">
          Your order is now being processed and will arrive shortly.
        </p>
      </div>

      {/* container for order summary and shipping address */}
      <div className="py-10 text-sm text-center">
        <p className="font-bold p-2">Order Number:</p>
        <p className="font-bold bg-vhsPink p-2 mb-3">{order._id}</p>

        {/* displaying shipping address */}
        <p>Order will be delivered to:</p>
        <ul className="pt-2">
          <li>{order.address.cust_name}</li>
          <li>{order.address.street}</li>
          <li>{order.address.zip_code}</li>
          <li>{order.address.city}</li>
        </ul>
      </div>

      <div>
        {/* button to return to the home page */}
        <NavLink to={'/'}>
          <button className="standard-btn">Return</button>
        </NavLink>
      </div>
    </>
  );
};

export default OrderDetails;
