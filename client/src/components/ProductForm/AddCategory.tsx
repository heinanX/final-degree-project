import { useEffect, useState } from "react";
import { useSocket as productSocket } from "../../contexts/productContext";

interface props {
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const AddCategory = ({ categories, setCategories }: props) => {
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const {getCategories} = productSocket();

    useEffect(()=> {
        getCategories();
    },
    [])

  const handleCatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    console.log(selectedCategory, "selectedCategory");
  };

  const handleAddCategory = () => {
    setCategories((prevCats) => [...prevCats, selectedCategory]);
    setSelectedCategory("");
  };

  const handleDeleteCategory = (categoryToDelete: string) => {
    setCategories((prevCats) =>
      prevCats.filter((category) => category !== categoryToDelete)
    );
  };

  return (
    <div>
      <div>
        {categories.map((category, index) => (
          <div key={index} className="flex items-center">
            <span>{category}</span>
            <button onClick={() => handleDeleteCategory(category)}>x</button>
          </div>
        ))}
      </div>

      <label className="pr-4">Category</label>
      <select
        value={selectedCategory}
        className="px-2"
        onChange={handleCatChange}
      >
        <option value="">Choose category</option>
        <option value="comedy">Comedy</option>
        <option value="romance">Romance</option>
      </select>
      <button onClick={handleAddCategory}>+</button>
    </div>
  );
};

export default AddCategory;
