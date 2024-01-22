import { useEffect } from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import { useSocket as orderSocket } from "../../../contexts/order.context";
const OrderDetails = () => {
  const { order } = orderSocket();

  useEffect(() => {
    console.log(order);
  }, [order]);

  return (
    <>
      <div className="flex flex-col items-center text-teal-600">
        <span className=" text-9xl">
          <LiaShippingFastSolid />
        </span>

        <h1 className="font-bold text-4xl">Thank You For Your Order!</h1>
        <p className="text-sm pt-1">
          Your order is now being processed and will arrive shortly
        </p>
      </div>

      <div className="py-10 text-sm">
        <p className="font-bold">Order Number: {order._id}</p>
        <p>Shipping Address:</p>
{/*       <ul>
        <li></li>
      </ul> */}
      </div>

      <div>
        <button className="standard-btn">Return to home</button>
        <button></button>
      </div>
    </>
  );
};

export default OrderDetails;
