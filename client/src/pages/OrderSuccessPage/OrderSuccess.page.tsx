import { useEffect, useState } from 'react';

import { useSocket as orderSocket } from '../../contexts/order.context';
import { CartItem } from '../../interfaces/cart.interface';
import LoadBar from './LoadBar/LoadBar';
import OrderDetails from './OrderDetails/OrderDetails';


const OrderSuccessPage = () => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ isloading, setIsLoading ] = useState<boolean>(true);
  const { createOrderDatabase } = orderSocket();

  useEffect(()=> {
    // Extract the session ID from the URL query string
    const queryString = location.search;
    const sessionId = queryString.substring(4);
    

    // Retrieve existing cart data from local storage
    const cartData = localStorage.getItem("cart");
    // Check if there is existing cart data in local storage
    if (cartData) {
      // Parse the existing cart data into an array of CartItem objects
      const cart = JSON.parse(cartData) as CartItem[];

      // Call function to create an order in the database
      createOrderDatabase(cart, sessionId)
    }
  }, [])

  //const [ isLoading, setIsLoading ] = useState();
  return (
    <div className="orderSuccess">
      {isloading ? <LoadBar /> : <OrderDetails />}
  </div>
  )
}

export default OrderSuccessPage