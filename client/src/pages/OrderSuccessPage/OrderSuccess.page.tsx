import { useEffect } from 'react';
import { useSocket as orderSocket } from '../../contexts/order.context';
import { Cart } from '../../interfaces/cart.interface';
import LoadBar from './LoadBar/LoadBar';
import OrderDetails from './OrderDetails/OrderDetails';

/* ORDERSUCCESS PAGE */

const OrderSuccessPage = () => {

  const { createOrderDatabase, isOrderLoading, setIsOrderLoading } = orderSocket();

  useEffect(()=> {
    setIsOrderLoading(true)
    // Extract the session ID from the URL query string
    const queryString = location.search;
    const sessionId = queryString.substring(4);

    const cartData = localStorage.getItem("cart");
    if (cartData) {
      const cart = JSON.parse(cartData) as Cart;
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