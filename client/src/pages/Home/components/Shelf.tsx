import { NavLink } from "react-router-dom";
import { Product } from "../../../interfaces/product.interface";

interface shelfProps {
  arr: Product[];
  category: string;
  windowSize: {
    width: number;
    height: number;
  };
}

/* A COMPONENT THAT RENDERS A SHELF WITH A SET OF MOVIES LINED OVER IT
  - depending on the size of the screen the shelf contains more or less titles
*/

const Shelf = ({ arr, category, windowSize }: shelfProps) => {

  // Slice array based on window width to adjust the number of displayed items
  let newArr = arr.slice(0, 5);

  if (windowSize.width < 1100) {
    newArr = arr.slice(0, 4);
  }
  if (windowSize.width < 950) {
    newArr = arr.slice(0, 3);
  }
  if (windowSize.width < 776) {
    newArr = arr.slice(0, 2);
  }
  if (windowSize.width < 620) {
    newArr = arr.slice(0, 1);
  }
  if (windowSize.width < 520) {
    newArr = arr.slice(0, 1);
  }

  return (
    <div className="relative my-10 mx-10 border border-vhsBlue h-96 flex flex-col justify-end rounded-sm">
      {/* shelf label containing a specific category title */}
      <div
        id="shelf-label"
        className="absolute border border-vhsBlue px-10 py-1 text-vhsBlue text-sm uppercase tracking-wider overflow-hidden"
      >
        {category}
      </div>

      {/*  Maps over sliced array to render NavLink for each product */}
      <div className="h-80 w-full flex gap-4 justify-center">
        {newArr.map((item, index) => (
          <NavLink to={`/product/${item._id}`} key={index}>
            <div className="h-80 relative">
              <img src={item.image} alt="item.title" className="h-full" />
            </div>
          </NavLink>
        ))}
      </div>
      {/* the "actual" shelf supporting the movies */}
      <div className="mb-2 mx-2 border border-teal-600 h-5  rounded-sm"></div>
    </div>
  );
};

export default Shelf;
