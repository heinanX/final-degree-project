import { useSocket as productSocket } from "../../../contexts/product.context";
import { useSocket as cartSocket } from "../../../contexts/cart.context";
import { Category } from "../../../interfaces/category.interface";
import { Tags } from "../../../interfaces/tags.interface";
import capitalizeLetters from "../../../functions/capitalizeLetters";

const ProductDetails = () => {
  const { getMovie } = productSocket();
  const { addToCart } = cartSocket();

  // handle renting VHS or digital copy
  const handleRent = (type: string, id: string) => {
    if (type === 'vhs') {
      console.log('Renting VHS', id);
      if (getMovie) addToCart(getMovie, 'vhs');
    } else {
      console.log('Renting Digital', id);
      if (getMovie) addToCart(getMovie, 'digital');
    }
  }

  return (
    <>
      {/* movie details */}
      <div className="w-1/2 flex flex-col justify-center p-4 ">
        {/* movie title */}
        <h1 data-info="Movie-title" className="text-5xl uppercase tracking-wide">
          {getMovie?.title}
        </h1>

        {/* movie information */}
        <ul className="flex flex-col gap-4 text-xl">
          <div className="flex flex-row gap-8 pt-4">
            {/* movie rating */}
            <li data-info="Movie-rating" className="text-xs flex items-center justify-center">
              <button className="bg-teal-500 p-1 rounded">{getMovie?.content_rating}</button>
            </li>
            {/* movie year */}
            <li data-info="Movie-year">
              {getMovie?.year}
            </li>

            {/* movie categories */}
            {getMovie?.category.map((cat: Category, index) => (
              <li data-info="Movie-category" key={index}>
                {cat.category}
              </li>
            ))}
          </div>

          {/* movie description */}
          <li data-info="Movie-description" className="text-lg">
            {getMovie?.description}
          </li>
        </ul>

        {/* rent buttons */}
        <div className="flex flex-row px-4 py-6" style={{ gap: "10%" }}>
          {/* rent VHS button */}
          <button className="standard-btn" onClick={() => handleRent('vhs', getMovie?._id || "")}>
            Rent VHS {getMovie?.vhs.price}
          </button>
          {/* rent digital button */}
          <button className="standard-btn" onClick={() => handleRent('digital', getMovie?._id || "")}>
            Rent Digital {getMovie?.digital.price}
          </button>
        </div>

        {/* movie actors/tags */}
        <div>
          <p>Actors:</p>
          {/* display movie tags */}
          {getMovie?.tags.map((tag: Tags, index) => (
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
