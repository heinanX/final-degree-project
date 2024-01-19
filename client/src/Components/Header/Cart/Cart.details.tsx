import { useSocket as cartSocket } from "../../../contexts/cart.context";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import "../../../scrollbar.css";

const CartDetails = () => {
  const { cart, handleQuantity } = cartSocket();

  return (
    <div className=" py-8 max-h-96 overflow-y-auto cart-scrollbar">
      <ul>
        {cart.map((item, index) => (
          <li key={index} className="flex items-center">
            <div className="w-1/6 pb-2">
              <img src={item.product.image} alt="" className="h-12" />
            </div>
            <div className="w-3/6">
              <p className="font-medium">{item.product.title}</p>
              <p className="text-xs">
                {item.digital ? "digital" : item.vhs ? "vhs" : ""}
              </p>
            </div>
            <div className="w-2/6 flex flex-row gap-2">
              <p className="bg-teal-200 inline py-1 px-3 rounded-md">
                {item.quantity}
              </p>
              <span className="flex flex-col text-gray-600">
                <button onClick={() => handleQuantity(index, "add")}>
                  <IoIosArrowUp />
                </button>
                <button onClick={() => handleQuantity(index, "sub")}>
                  <IoIosArrowDown />
                </button>
              </span>
              <button
                onClick={() => handleQuantity(index, "del")}
                className="text-gray-600"
              >
                <FaRegTrashCan />{" "}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartDetails;
