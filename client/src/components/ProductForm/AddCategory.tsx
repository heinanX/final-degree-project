import { useEffect, useState } from "react";
import { useSocket as productSocket } from "../../contexts/productContext";

interface props {
  frmCategories: string[];
  setFrmCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const AddCategory = ({ frmCategories, setFrmCategories }: props) => {
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const {getCategories, categories} = productSocket();

    useEffect(()=> {
        getCategories();
    },
    [])

  const handleCatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    console.log(selectedCategory, "selectedCategory");
  };

  const handleAddCategory = () => {
    setFrmCategories((prevCats) => [...prevCats, selectedCategory]);
    setSelectedCategory("");
  };

  const handleDeleteCategory = (categoryToDelete: string) => {
    setFrmCategories((prevCats) =>
      prevCats.filter((category) => category !== categoryToDelete)
    );
  };

  return (
    <div>
      <div>
        {frmCategories.map((category, index) => (
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
        
        { categories.map((category, index) => (
        <option key={index} value={category.category}>{category.category}</option>
        ))}
      </select>
      <button onClick={handleAddCategory}>+</button>
    </div>
  );
};

export default AddCategory;
