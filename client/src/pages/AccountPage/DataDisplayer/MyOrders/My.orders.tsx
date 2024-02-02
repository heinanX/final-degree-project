import { useSocket as orderSocket } from "../../../../contexts/order.context";
import formatDate from "../../../../functions/date.formatter";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { IoIosCheckbox } from "react-icons/io";
import { useEffect } from "react";

/* COMPONENT THAT RENDERS OUT A COMPLETE ORDER */

const MyOrders = () => {

  const { getUserOrdersDatabase, userOrders } = orderSocket();

  useEffect(() => {
    getUserOrdersDatabase();
  }, []);

  return (
    <div
      id="myOrders"
      className="w-full px-4 py-2 overflow-y-auto primary-scrollbar"
    >
      {userOrders.length === 0 ? (
        <p>Loading...</p>
      ) : (
        userOrders.map((orders, index) => (
          <form
            key={index}
            className="w-full text-sm flex flex-col gap-2 py-6 px-2 text-gray-400 odd:bg-teal-950"
          >
            {/* Render order id */}
            <div className="flex flex-row items-center gap-2 uppercase w-full">
              <label className="w-1/3">order id</label>
              <input
                type="text"
                disabled={true}
                defaultValue={orders._id}
                className="w-2/3 standard-form-darkmode"
              />
            </div>

            {/* Render total price */}
            <div className="flex flex-row items-center gap-2 uppercase">
              <label className="w-1/3">total_price</label>
              <input
                type="text"
                disabled={true}
                defaultValue={orders.total_price + " SEK"}
                className="w-2/3 standard-form-darkmode"
              />
            </div>

            {orders.discount > 0 ? (
              <div className="flex flex-row items-center gap-2 uppercase">
                <label className="w-1/3">discount</label>
                <input
                  type="text"
                  disabled={true}
                  defaultValue={orders.discount}
                  className="w-2/3 standard-form-darkmode"
                />
              </div>
            ) : (
              <></>
            )}

            {/* Render payment status */}
            <div className="flex flex-row items-center gap-2 uppercase">
              <label className="w-1/3">payment status</label>
              <input
                type="text"
                disabled={true}
                defaultValue={orders.payment_status}
                className="w-2/3 standard-form-darkmode"
              />
            </div>

            {/* Render order date */}
            <div className="flex flex-row items-center gap-2 uppercase">
              <label className="w-1/3">date</label>
              <input
                type="text"
                disabled={true}
                defaultValue={formatDate(orders.date)}
                className="w-2/3 standard-form-darkmode"
              />
            </div>

            {/* Render returned status with checkbox icon */}
            <div className="flex flex-row items-center justify-between gap-2 uppercase">
              <label className="w-1/3">returned</label>
              {orders.returned ? (
                <span className="text-base text-yellow-400">
                  <IoIosCheckbox />
                </span>
              ) : (
                <span className="text-base text-yellow-400">
                  <MdOutlineCheckBoxOutlineBlank />
                </span>
              )}
            </div>

            {/* Render shipped status with checkbox icon */}
            <div className="flex flex-row items-center justify-between gap-2 uppercase">
              <label className="w-1/3">shipped</label>
              {orders.shipped ? (
                <span className="text-base text-yellow-400">
                  <IoIosCheckbox />
                </span>
              ) : (
                <span className="text-base text-yellow-400">
                  <MdOutlineCheckBoxOutlineBlank />
                </span>
              )}
            </div>
          </form>
        ))
      )}
    </div>
  );
};

export default MyOrders;
