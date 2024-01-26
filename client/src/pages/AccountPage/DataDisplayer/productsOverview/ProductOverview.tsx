import capitalizeLetters from "../../../../functions/capitalizeLetters"
import { Product } from "../../../../interfaces/product.interface"

interface ProductOverviewProps {
    productItem: Product
}

const ProductOverview = ({productItem}: ProductOverviewProps) => {
  return (
    <>
<img src={productItem.image} alt="" className="w-12" />
          
          <ul className="flex flex-col lg:flex-row justify-between mb-2 p-2 w-full text-base md:text-xs">
            
            <li className="w-full lg:w-1/3 pr-5">{capitalizeLetters(productItem.title)}</li>
            
            <li className="w-full lg:w-1/3 text-gray-400">id: {productItem._id}</li>
            
            <li className="w-full flex flex-col gap-2 lg:w-1/3 lg:text-right lg:pr-2">
              <p>VHS: {productItem.vhs.price}:-</p>
              <p>Digital: {productItem.digital.price}:-</p>
            </li>
          </ul>
          </>
  )
}

export default ProductOverview