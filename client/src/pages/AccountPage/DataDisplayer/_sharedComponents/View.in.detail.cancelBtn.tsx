import { useSocket as productSocket } from "../../../../contexts/product.context";
import { useSocket as orderSocket } from "../../../../contexts/order.context";
import { IoIosReturnLeft } from "react-icons/io";

/* A COMPONENT THAT RENDERS A CANCEL BUTTON FOR RETURNING FROM DETAILED VIEWS OF PRODUCTS OR ORDERS */

const ViewInDetailCancelBtn = () => {
  const { viewProductDetails, setViewProductDetails } = productSocket();
  const { setViewOrderDetails } = orderSocket();

  // Function to handle the cancellation and return to the previous view
  const setDetails = () => {
    if (viewProductDetails) {
      setViewProductDetails(null);
    } else {
      setViewOrderDetails(null);
    }
  };

  // Determine the appropriate CSS classes based on the view
  let customCss;
  if (viewProductDetails) {
    customCss = "pt-10 pr-10";
  } else {
    customCss = "py-2";
  }

  // Render the cancel button with the appropriate styling and functionality
  return (
    <div className={`flex w-full justify-end pr-10 ${customCss}`}>
      <button
        className="standard-btn-red flex flex-row items-center gap-2"
        onClick={() => setDetails()}
      >
        <span className="pt-1">
          <IoIosReturnLeft />
        </span>
        cancel
      </button>
    </div>
  );
};

export default ViewInDetailCancelBtn;
