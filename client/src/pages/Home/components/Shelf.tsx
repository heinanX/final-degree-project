import { Product } from "../../../interfaces/product.interface";

interface shelfProps {
  arr: Product[];
  category: string;
  windowSize: {
    width: number;
    height: number;
  };
}

const Shelf = ({ arr, category, windowSize }: shelfProps) => {

  let newArr = arr.slice(0, 6);

  if (windowSize.width < 1100) {
    newArr = arr.slice(0, 5);
  }
  if (windowSize.width < 950) {
    newArr = arr.slice(0, 4);
  }
  if (windowSize.width < 776) {
    newArr = arr.slice(0, 3);
  }
  if (windowSize.width < 620) {
    newArr = arr.slice(0, 2);
  }
  if (windowSize.width < 520) {
    newArr = arr.slice(0, 1);
  }

  return (
    <div className="relative my-10 mx-16 border border-teal-700 h-60 flex flex-col justify-end rounded-sm">
      <div
        className="absolute border border-teal-700 px-10 text-teal-700 text-sm uppercase tracking-wider"
        style={{
          top: "-26px",
          left: "-1px",
          paddingTop: "2px",
          paddingBottom: "2px",
        }}
      >
        {category}
      </div>
      <div className="h-48 w-full flex gap-4 justify-center">
        {newArr.map((item, index) => (
          <div key={index} className="h-48 relative">
            <img
              src={item.image}
              alt="item.title"
              className="h-full"
            />
          </div>
        ))}
      </div>
      <div className="mb-2 mx-2 border border-teal-900 h-5  rounded-sm"></div>
    </div>
  );
};

export default Shelf;
