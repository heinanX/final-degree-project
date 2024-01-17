import { useSocket as cartSocket } from "../../contexts/cart.context";
import "../../scrollbar.css";

const CheckoutDetails = () => {
  const { cart, cartTotal } = cartSocket();
  return (
    <div className="w-1/2">
      <ul className="max-h-96 p-4 overflow-y-auto cart-scrollbar border border-teal-600 text-white">
        {cart.map((item, index) => (
          <li key={index} className="pb-4 flex flex-row">
            <img
              src={item.product.image}
              alt={item.product.title}
              className="w-16"
            />
            <div className="pl-10 py-4">
              <p className="font-medium uppercase">{item.product.title}</p>
              <p className="text-xs">
                {item.vhs ? "VHS rental" : item.digital ? "Digital rental" : ""}
              </p>

              <p className="text-xs text-gray-300">
                Quantity: {item.quantity}
              </p>
              {item.vhs ? (
                <p className="text-xs text-gray-300">{item.product.vhs.price} sek/each</p>
              ) : item.digital ? (
                <p className="text-xs text-gray-300"> {item.product.vhs.price} sek/each</p>
              ) : (
                <></>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="border border-teal-600 rounded-sm flex flex-row justify-between text-white" >
      <p className="uppercase py-2 px-10 text-end">Total sum:</p>
      <p className="uppercase py-2 px-10 text-end">{cartTotal} sek</p>
      </div>
    </div>
  );
};

export default CheckoutDetails;
