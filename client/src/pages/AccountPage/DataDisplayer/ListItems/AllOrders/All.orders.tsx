import { useEffect, useState } from "react";
import { useSocket as orderSocket } from "../../../../../contexts/order.context";
import FormSearch from "../../sharedComponents/Form.search";
import OrderOverview from "./Order.overview";
import { Order } from "../../../../../interfaces/order.interface";
import { Product } from "../../../../../interfaces/product.interface";


interface AllOrdersProps {
  displayComponent: string;
  viewDetails: Product[] | Order[]
  setViewDetails: React.Dispatch<React.SetStateAction<Order[] | Product[]>>
}
const AllOrders = ({ displayComponent, setViewDetails }: AllOrdersProps) => {
  const { getOrders, getOrdersDatabase } = orderSocket();
  const [showOrders, setShowOrders] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      await getOrdersDatabase();
      setLoading(false);      
    };

    fetchData();
  }, []);

  return (
    <div className="h-5/6 overflow-y-auto cart-scrollbar w-full p-2 text-xs">
      <FormSearch setShowState={setShowOrders} displayComponent={displayComponent} />

      {loading ? (
        <p>Loading...</p> // Loading message while fetching orders
      ) :
          // Render orders if not loading
          showOrders &&
          getOrders.map((item, index) => (
            <div
              key={index}
              id="all-orders-main-div"
              className="flex flex-row items-center pb-2 odd:bg-teal-900"
              onClick={() => setViewDetails([item])}
            >
              <OrderOverview item={item} />
            </div>
          ))}
    </div>
  );
};

export default AllOrders;
