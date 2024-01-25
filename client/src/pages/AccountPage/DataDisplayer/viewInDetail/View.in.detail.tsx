import { Order } from '../../../../interfaces/order.interface'
import { Product } from '../../../../interfaces/product.interface'
import ViewSingleOrder from './View.single.order';
import ViewSingleProduct from './View.single.product';

interface ViewInDetailProps {
    viewDetails: Order[] | Product[];
    setViewDetails: React.Dispatch<React.SetStateAction<Order[] | Product[]>>;
}

const ViewInDetail= ({viewDetails, setViewDetails}: ViewInDetailProps) => {
    console.log(viewDetails);
    
  return (
    <div>
        {viewDetails ? <ViewSingleOrder viewDetails={viewDetails} setViewDetails={setViewDetails} /> : <ViewSingleProduct viewDetails={viewDetails} /> }
    </div>
  )
}

export default ViewInDetail