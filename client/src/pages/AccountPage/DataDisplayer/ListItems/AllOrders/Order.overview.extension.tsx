import { Order } from "../../../../../interfaces/order.interface";
//import { MdOutlineEdit } from "react-icons/md";
interface OrderOverviewExtensionProps {
  item: Order;
}

const OrderOverviewExtension = ({ item }: OrderOverviewExtensionProps) => {
  return (
    <ul className="flex flex-col text-base xl:flex-row justify-between xl:items-center gap-1 mb-2 p-2 w-full md:text-xs text-gray-400">
      <li className="w-full xl:w-2/6 pr-2">customer: {item.customer}</li>
      {item.address.map((address, index) => (
        <li key={index}>
          <p>{address.street}</p>
          <p>{address.zip_code}</p>
          <p>{address.city}</p>
        </li>
      ))}

      <li className="w-full xl:w-1/6 pr-2">discount: {item.discount} sek</li>
      <li className="w-full xl:w-1/6 pr-2">
        order total: {item.total_price} sek
      </li>
      {item.order.map((orderItem, index) => (
        <li key={index}>
          <p>{orderItem.product}</p>
          <p>{orderItem.quantity}</p>
        </li>
      ))}
    </ul>
  );
};

export default OrderOverviewExtension;
