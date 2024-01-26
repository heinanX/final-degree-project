import ViewSingleOrder from './View.single.order';
import ViewSingleProduct from './View.single.product';
import { useSocket as orderSocket } from '../../../../contexts/order.context';


const ViewInDetail= () => {
  const { viewOrderDetails } = orderSocket();
    console.log(viewOrderDetails);
    
  return (
    <div>
        {viewOrderDetails ? <ViewSingleOrder /> : <ViewSingleProduct /> }
    </div>
  )
}

export default ViewInDetail