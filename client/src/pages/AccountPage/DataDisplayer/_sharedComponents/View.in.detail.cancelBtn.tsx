import { useSocket as productSocket } from "../../../../contexts/product.context";
import { useSocket as orderSocket } from "../../../../contexts/order.context";
import { IoIosReturnLeft } from "react-icons/io";

const ViewInDetailCancelBtn = () => {
  const { viewProductDetails, setViewProductDetails } = productSocket();
  const { setViewOrderDetails } = orderSocket();

  const setDetails = () => {
    if (viewProductDetails) {
      setViewProductDetails(null);
    } else {
      setViewOrderDetails(null);
    }
  };

  let css;
  if (viewProductDetails) {
    css = "pt-10 pr-10";
  } else {
    css = "py-2";
  }

  return (
    <div className={`flex w-full justify-end pr-10 ${css}`}>
      <button className="standard-btn-red flex flex-row items-center gap-2" onClick={() => setDetails()}>
      <span className="pt-1">
      <IoIosReturnLeft />
      </span>
        cancel
      </button>
    </div>
  );
};

export default ViewInDetailCancelBtn;
