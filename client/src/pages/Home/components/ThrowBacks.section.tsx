import { useSocket as useSocketProducts } from "../../../contexts/product.context";

const ThrowBacksSection = () => {
  const { products } = useSocketProducts();

  const throwBacks = products.filter(product => product.year < 1960);
  return (
<div className="relative my-10 mx-16 border border-teal-700 h-60 flex flex-col justify-end rounded-sm">
      <div
        className="absolute border border-teal-700 px-10 text-teal-700"
        style={{ top: "-26px", left: "-1px" }}
      >
        Throw Backs
      </div>
      <div className="h-48 w-full flex gap-4 justify-center">
        {throwBacks.map((item, index) => (
          <div className="relative"  key={index} >
          <img src={item.image} alt=""className="h-48" />
          <button className="absolute bottom-2 left-0 w-full px-2"> read more</button>
          </div>
        ))}
      </div>
      <div className="mb-2 mx-2 border border-teal-900 h-5  rounded-sm"></div>
    </div>
  );
};

export default ThrowBacksSection;
