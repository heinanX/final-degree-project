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

      <div className="py-10 text-sm bg-">
        <p className="font-bold">Order Number: {order._id}</p>
        <p className="">Order Total: {order.total_price}</p>
        <p>Shipping Address:</p>
        
          <ul>
          <li>{order.address.street}</li>
          <li>{order.address.zip_code}</li>
          <li>{order.address.city}</li>
          </ul>
      </div>

      <div>
        <button className="standard-btn">Return to home</button>
        <button></button>
      </div>
    </>
  );
};

export default OrderDetails;
