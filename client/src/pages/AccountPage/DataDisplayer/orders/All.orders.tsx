import { useEffect, useState } from "react";
import { useSocket as orderSocket } from "../../../../contexts/order.context";
import FormSearch from "../_sharedComponents/Form.search";
import OrderOverview from "../ordersOverview/Order.overview";

// Props interface for AllOrders component
interface AllOrdersProps {
  displayComponent: string;
}

/* COMPONENT THAT RENDERS ALL ORDERS FROM DATABASE */

const AllOrders = ({ displayComponent }: AllOrdersProps) => {
  //Destructuring functions from orderSocket
  const { getOrders, getOrdersDatabase, setViewOrderDetails } = orderSocket();

  //State to manage whether to show orders and loading status
  const [showOrders, setShowOrders] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  //Fetch orders from database on component mount
  useEffect(() => {
    const fetchData = async () => {
      await getOrdersDatabase();
      setLoading(false); // Set loading to false once data is fetched
    };

    fetchData();
  }, []);

  return (
    <div className="h-5/6 overflow-y-auto primary-scrollbar w-full p-2 text-xs">
      <FormSearch
        setShowState={setShowOrders}
        displayComponent={displayComponent}
      />

      {loading ? (
        <p>Loading...</p> //Loading message while fetching orders
      ) : (
        //Render orders if not loading
        showOrders &&
        getOrders.map((orderObject, index) => ( //maps through getOrders array
          <div
            key={index}
            id="all-orders-main-div"
            className="flex flex-row items-center pb-2 odd:bg-teal-900"
            onClick={() => setViewOrderDetails(orderObject)}
          >
            {/* renders component for each orderObject and passes it as a prop */}
            <OrderOverview orderObject={orderObject} /> 
          </div>
        ))
      )}
    </div>
  );
};

export default AllOrders;
