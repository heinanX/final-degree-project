import ViewSingleOrder from './View.single.order';
import ViewSingleProduct from './View.single.product';
import { useSocket as orderSocket } from '../../../../contexts/order.context';


const ViewInDetail= () => {
  const { viewDetails } = orderSocket();
    console.log(viewDetails);
    
  return (
    <div>
        {viewDetails ? <ViewSingleOrder /> : <ViewSingleProduct /> }
    </div>
  )
}

export default ViewInDetail