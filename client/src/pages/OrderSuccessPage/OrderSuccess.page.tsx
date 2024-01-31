import { useEffect } from 'react';
import { useSocket as orderSocket } from '../../contexts/order.context';
import { Cart } from '../../interfaces/cart.interface';
import LoadBar from './LoadBar/LoadBar';
import OrderDetails from './OrderDetails/OrderDetails';

/* ORDERSUCCESS PAGE */

const OrderSuccessPage = () => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //const [ isloading, setIsLoading ] = useState<boolean>(false);
  const { createOrderDatabase, isOrderLoading, setIsOrderLoading } = orderSocket();

  useEffect(()=> {
    setIsOrderLoading(true)
    // Extract the session ID from the URL query string
    const queryString = location.search;
    const sessionId = queryString.substring(4);

    // Retrieve existing cart data from local storage
    const cartData = localStorage.getItem("cart");
    // Check if there is existing cart data in local storage
    if (cartData) {
      // Parse the existing cart data into an array of CartItem objects
      const cart = JSON.parse(cartData) as Cart;
      console.log(cart);
      // Call function to create an order in the database
      createOrderDatabase(cart, sessionId)
    }
  }, [])

  return (
    <div className="orderSuccess flex flex-col items-center py-32 my-40 mx-4 border border-teal-600">
      {isOrderLoading ? <LoadBar /> : <OrderDetails />}
  </div>
  )
}

export default OrderSuccessPage