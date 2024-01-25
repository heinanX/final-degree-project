import { Order } from "../../../../interfaces/order.interface"
import { Product } from "../../../../interfaces/product.interface"

interface ViewSingleProductProps {
    viewDetails: Order[] | Product[]
}
const ViewSingleProduct = ({viewDetails}: ViewSingleProductProps) => {
    console.log(viewDetails);
    
  return (
    <div>ViewSingleProduct</div>
  )
}

export default ViewSingleProduct