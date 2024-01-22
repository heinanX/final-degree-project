//import { useState } from "react";
import { useEffect } from 'react';
import logo from '../../assets/images/logo-videoshack_tape.png';
import { useSocket as cartSocket } from '../../contexts/cart.context';
import { useSocket as orderSocket } from '../../contexts/order.context';


const OrderConfirmationPage = () => {

  const { cart } = cartSocket();
  const { createOrderDatabase } = orderSocket();

  useEffect(()=> {
    console.log(cart);
    
    const queryString = location.search;
    const sessionId = queryString.substring(4);
    createOrderDatabase(cart, sessionId)
  }, [cart])

  //const [ isLoading, setIsLoading ] = useState();
  return (
    <div className="orderSuccess">
    <img src={logo} style={{ width: "100px" }} />
    <h1 style={{ fontWeight: "800" }}>Thank You For Your Order!</h1>
    <p style={{ color: "rgb(100, 100, 100)" }}>
      It is now being processed and will arrive shortly
    </p>
    <div className="orderDataContainer">

    </div>
  </div>
  )
}

export default OrderConfirmationPage