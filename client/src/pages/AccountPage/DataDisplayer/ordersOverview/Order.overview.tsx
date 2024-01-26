import { Order } from "../../../../interfaces/order.interface"; //order interface
import formatDate from "../../../../functions/date.formatter"; //date converter function
import { IoIosCheckbox } from "react-icons/io"; //checkbox icon
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md"; // box outline icon

interface OrderOverviewProps {
  orderObject: Order;
}

/* COMPONENT THAT RENDERS AN OVERVIEW OF AN ORDER */

const OrderOverview = ({ orderObject }: OrderOverviewProps) => {

  //css styling for li elements with checkboxes
  const liWithCheckboxCss =
    "flex flex-row xl:flex-col xl:justify-center items-center gap-2 xl:w-1/6";

  return (
    <ul className="flex flex-col text-base xl:flex-row justify-between xl:items-center gap-1 mb-2 p-2 w-full md:text-xs">
     
      {/* 'ORDER ID' */}
      <li className="w-full xl:w-2/6 pr-2">id: {orderObject._id}</li>

      {/* 'PAYMENT STATUS' */}
      <li className="w-full xl:w-1/6 pr-2">
        status: <span className="text-green-500">{orderObject.payment_status}</span>
      </li>

      {/* 'ORDER STATUS' */}
      <li className="w-full xl:w-1/6 pr-2">order: {orderObject.order_status}</li>

      {/* 'SHIPPED' CHECKBOX DEPENDENT ON STATUS */}
      <li className={liWithCheckboxCss}>
        <p>shipped</p>
        {orderObject.shipped ? (
          <span className="text-base text-yellow-400">
            <IoIosCheckbox />
          </span>
        ) : (
          <span className="text-base text-yellow-400">
            <MdOutlineCheckBoxOutlineBlank />
          </span>
        )}
      </li>

      {/* 'RETURNED' CHECKBOX DEPENDENT ON STATUS */}
      <li className={liWithCheckboxCss}>
        <p>returned</p>
        {orderObject.returned ? (
          <span className="text-base text-yellow-400">
            <IoIosCheckbox />
          </span>
        ) : (
          <span className="text-base text-yellow-400">
            <MdOutlineCheckBoxOutlineBlank />
          </span>
        )}
      </li>

      {/* UTILIZES 'FORMATDATE' FUNCTION TO DISPLAY DATE AS MM/DD/YY*/}
      <li className="w-full lg:w-1/6 pr-2">{formatDate(orderObject.date)}</li>
    </ul>
  );
};

export default OrderOverview;
