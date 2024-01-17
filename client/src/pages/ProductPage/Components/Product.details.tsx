import { useSocket as productSocket } from "../../../contexts/product.context";
import { useSocket as cartSocket } from "../../../contexts/cart.context";
import { CategoryTwo } from "../../../interfaces/category.interface";
import { Tags } from "../../../interfaces/tags.interface";
import capitalizeLetters from "../../../functions/capitalizeLetters";

const ProductDetails = () => {
  const { getMovie } = productSocket();
  const { addToCart } = cartSocket();

  const handleRent = (type: string, id: string) => {
    if (type === 'vhs') {
      console.log('vhs', id);
      
      if (getMovie) addToCart(getMovie, 'vhs');
    } else {
      console.log('digital', id);
      if (getMovie) addToCart(getMovie, 'digital');
    }
  }

  return (
    <>
      <div className="w-1/2 bg-red-200 flex flex-col justify-center p-4 ">
        <h1
          data-info="Movie-title"
          className="text-5xl uppercase tracking-wide"
        >
          {getMovie?.title}
        </h1>
        <ul className="flex flex-col gap-4 text-xl">
          <div className="flex flex-row gap-8 pt-4">
            <li
              data-info="Movie-rating"
              className="text-xs flex items-center justify-center"
            >
              <button className="bg-teal-500 p-1 rounded">
                {" "}
                {getMovie?.content_rating}
              </button>
            </li>
            <li data-info="Movie-year" className="">
              {getMovie?.year}
            </li>

            {getMovie?.category.map((cat: CategoryTwo, index) => (
              <li data-info="Movie-category" key={index} className="">
                {cat.category}
              </li>
            ))}
          </div>

          <li data-info="Movie-description" className="text-lg">
            {getMovie?.description}
          </li>
        </ul>

        <div className="flex flex-row px-4 py-6" style={{ gap: "10%" }}>
          <button className="standard-btn" onClick={() => handleRent('vhs', getMovie?._id || "")}>
            Rent VHS {getMovie?.vhs.price}
          </button>
          <button className="standard-btn"  onClick={() => handleRent('digital', getMovie?._id || "")}>
            Rent Digital {getMovie?.digital.price}
          </button>
        </div>

        <div>
          <p>Actors:</p>
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
