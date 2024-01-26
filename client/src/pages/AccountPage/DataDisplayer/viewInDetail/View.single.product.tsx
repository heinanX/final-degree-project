import { useSocket as orderSocket } from "../../../../contexts/order.context";

const ViewSingleProduct = () => {
  const { viewDetails } = orderSocket();
    console.log(viewDetails);
    
  return (
    <div>ViewSingleProduct</div>
  )
}

export default ViewSingleProduct