import { OrderItem } from "../../../../../../interfaces/order.interface";

interface SingleOrderProductsProps {
    singleOrder: OrderItem[];
  }

  /* COMPONENT THAT RENDERS INFORMATION INSIDE A SINGLE ORDER OF ORDER */

const SingleOrderProducts = ({singleOrder}:SingleOrderProductsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 uppercase w-full">
    <label className="w-2/5 pt-1">Products</label>
    <div className="pr-5 py-2 overflow-y-auto primary-scrollbar h-40 w-full">
      {singleOrder.map((orderItem, index) => (
        <div
          key={index}
          className="flex flex-col items-end gap-2 odd:bg-teal-800 py-2"
        >
          <div className="flex flex-row items-center justify-end gap-2 w-full">
            <label>id</label>
            <input
              type="text"
              disabled={true}
              defaultValue={orderItem.product}
              className="standard-form-darkmode "
            />
          </div>

          <div className="flex flex-row items-center justify-end gap-2 w-full">
            <label>qty.</label>
            <input
              type="text"
              disabled={true}
              defaultValue={orderItem.quantity}
              className=" text-right standard-form-darkmode"
            />
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default SingleOrderProducts