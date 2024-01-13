import { useSocket as useSocketProducts } from "../../../contexts/product.context";

const RecentlyAddedSection = () => {
  const { products } = useSocketProducts();

  const recentlyAdded = products.slice(-5);

  return (
    <div className="relative my-10 mx-16 border border-teal-700 h-60 flex flex-col justify-end rounded-sm">
      <div
        className="absolute border border-teal-700 px-10 text-teal-700"
        style={{ top: "-26px", left: "-1px" }}
      >
        Recently Added
      </div>
      <div className="h-48 w-full flex gap-4 justify-center">
        {recentlyAdded.map((item, index) => (
          <img src={item.image} alt="" key={index} className="h-48" />
        ))}
      </div>
      <div className="mb-2 mx-2 border border-teal-900 h-5  rounded-sm"></div>
    </div>
  );
};

export default RecentlyAddedSection;
