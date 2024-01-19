//import { useState } from "react";
import logo from '../../assets/images/logo-videoshack_tape.png';


const OrderConfirmationPage = () => {

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