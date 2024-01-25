import { Order } from "../../../../../interfaces/order.interface";
import formatDate from "../../../../../functions/date.formatter";
import { IoIosCheckbox } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

interface OrderOverviewProps {
  item: Order;
}

const OrderOverview = ({ item }: OrderOverviewProps) => {

  const liWithCheckboxCss = 'flex flex-row xl:flex-col xl:justify-center items-center gap-2 xl:w-1/6'

  return (
    <ul className="flex flex-col text-base xl:flex-row justify-between xl:items-center gap-1 mb-2 p-2 w-full md:text-xs">
      <li className="w-full xl:w-2/6 pr-2">id: {item._id}</li>
      <li className="w-full xl:w-1/6 pr-2">
        status: <span className="text-green-500">{item.payment_status}</span>
      </li>
      <li className={liWithCheckboxCss}>
        order: {item.order_status}
      </li>
      <li className={liWithCheckboxCss}>
        <p>shipped</p>
        {item.shipped ? (
          <span className="text-base">
          <IoIosCheckbox />
          </span>
        ) : (
          <span className="text-base">
          <MdOutlineCheckBoxOutlineBlank />
          </span>
        )}
      </li>
      <li className={liWithCheckboxCss}>
        <p>returned</p>
        {item.returned ? (
          <span className="text-base">
          <IoIosCheckbox />
          </span>
        ) : (
          <span className="text-base">
          <MdOutlineCheckBoxOutlineBlank />
          </span>
        )}
      </li>

      <li className="w-full lg:w-1/6 pr-2">{formatDate(item.date)}</li>

    </ul>
  );
};

export default OrderOverview;