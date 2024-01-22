import { useEffect } from 'react';
import { LiaShippingFastSolid } from "react-icons/lia";
import { useSocket as orderSocket } from '../../../contexts/order.context';
const OrderDetails = () => {

    const { order } = orderSocket();

    useEffect(()=> {
        console.log(order);
        
    }, [order])

  return (
    <>
    <span className='text-white text-8xl'>
              <LiaShippingFastSolid />
    </span>

    <h1 style={{ fontWeight: "800" }}>Thank You For Your Order!</h1>
    <p style={{ color: "rgb(100, 100, 100)" }}>
      It is now being processed and will arrive shortly
    </p>
    <div className="orderDataContainer">

    </div>
    </>

  )
}

export default OrderDetails