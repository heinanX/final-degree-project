import { useEffect, useState } from "react";
import { useSocket as orderSocket } from "../../../../contexts/order.context";
import FormSearch from "../_sharedComponents/Form.search";
import OrderOverview from "../ordersOverview/Order.overview";

interface AllOrdersProps {
  displayComponent: string;
}

/* COMPONENT THAT RENDERS ALL ORDERS FROM DATABASE */

const AllOrders = ({ displayComponent }: AllOrdersProps) => {
  const { getOrders, getOrdersDatabase, setViewOrderDetails } = orderSocket();

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
    <div className="h-5/6 overflow-y-auto primary-scrollbar w-full p-2 text-xs">
      <FormSearch
        setShowState={setShowOrders}
        displayComponent={displayComponent}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        showOrders &&
        getOrders.map((orderObject, index) => (
          <div
            key={index}
            id="all-orders-main-div"
            className="flex flex-row items-center pb-2 odd:bg-teal-900"
            onClick={() => setViewOrderDetails(orderObject)}
          >
            <OrderOverview orderObject={orderObject} /> 
          </div>
        ))
      )}
    </div>
  );
};

export default AllOrders;
