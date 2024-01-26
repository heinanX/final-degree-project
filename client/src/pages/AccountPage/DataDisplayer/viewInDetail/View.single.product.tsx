import { useSocket as orderSocket } from "../../../../contexts/order.context";

const ViewSingleProduct = () => {
  const { viewOrderDetails } = orderSocket();
    console.log(viewOrderDetails);
    
  return (
    <div>ViewSingleProduct</div>
  )
}

export default ViewSingleProduct