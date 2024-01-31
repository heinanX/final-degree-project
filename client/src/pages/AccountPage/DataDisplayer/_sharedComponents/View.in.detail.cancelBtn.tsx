import { useSocket as productSocket } from "../../../../contexts/product.context";
import { useSocket as orderSocket } from "../../../../contexts/order.context";
import { IoIosReturnLeft } from "react-icons/io";

// This component renders a cancel button for returning from detailed views of products or orders.
const ViewInDetailCancelBtn = () => {
  // Accessing productSocket for product-related state and functions
  const { viewProductDetails, setViewProductDetails } = productSocket();
  
  // Accessing orderSocket for order-related state and functions
  const { setViewOrderDetails } = orderSocket();

  // Function to handle the cancellation and return to the previous view
  const setDetails = () => {
    // Check if currently viewing product details or order details
    if (viewProductDetails) {
      // If viewing product details, reset product details state
      setViewProductDetails(null);
    } else {
      // If viewing order details, reset order details state
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
