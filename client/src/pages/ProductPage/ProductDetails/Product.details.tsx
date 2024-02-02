import { useSocket as cartSocket } from "../../../contexts/cart.context";
import { Category } from "../../../interfaces/category.interface";
import { Tags } from "../../../interfaces/tags.interface";
import capitalizeLetters from "../../../functions/capitalizeLetters";
import { Product } from "../../../interfaces/product.interface";

interface ProductDetailsProp {
  loadedProduct: void | Product | null
}

const ProductDetails = ({ loadedProduct}: ProductDetailsProp) => {
  const { addToCart } = cartSocket();

  // handle renting VHS or digital copy
  const handleRent = (type: string) => {
    if (type === 'vhs') {
      if (loadedProduct) addToCart(loadedProduct, 'vhs');
    } else {
      if (loadedProduct) addToCart(loadedProduct, 'digital');
    }
  }

  return (
    <>
      <div className="w-1/2 flex flex-col justify-center p-4 ">
        {/* movie title */}
        <h1 data-info="Movie-title" className="text-5xl uppercase tracking-wide">
          {loadedProduct?.title}
        </h1>

        <ul className="flex flex-col gap-4 text-xl">
          <div className="flex flex-row gap-8 pt-4">

            {/* movie rating */}
            <li data-info="Movie-rating" className="text-xs flex items-center justify-center">
              <button className="bg-teal-500 p-1 rounded">{loadedProduct?.content_rating}</button>
            </li>
            
            {/* movie year */}
            <li data-info="Movie-year">
              {loadedProduct?.year}
            </li>

            {/* movie categories */}
            {loadedProduct?.category.map((cat: Category, index) => (
              <li data-info="Movie-category" key={index}>
                {cat.category}
              </li>
            ))}
          </div>

          {/* movie description */}
          <li data-info="Movie-description" className="text-lg">
            {loadedProduct?.description}
          </li>
        </ul>

        {/* rent buttons */}
        <div className="flex flex-row px-4 py-6" style={{ gap: "10%" }}>
          <button className="standard-btn" onClick={() => handleRent('vhs')}>
            Rent VHS {loadedProduct?.vhs.price}
          </button>
          <button className="standard-btn" onClick={() => handleRent('digital')}>
            Rent Digital {loadedProduct?.digital.price}
          </button>
        </div>

        {/* movie actors/tags */}
        <div>
          <p>Actors:</p>
          {loadedProduct?.tags.map((tag: Tags, index) => (
            <p data-info="movie-tags" key={index} className="text-xl">
              {capitalizeLetters(tag.tag)}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
