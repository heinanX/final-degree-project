import { useEffect, useState } from "react";
import { useSocket as categorySocket } from "../../../../../contexts/category.context";
import { LuPlus } from "react-icons/lu";

interface props {
  frmCategories: string[];
  setFrmCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

/* COMPONENT THAT ADDS A CATEGORY TO ADD PRODUCT FORM
  - still a WIP
*/

const AddCategory = ({ frmCategories, setFrmCategories }: props) => {
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const {getCategories, categories} = categorySocket();

    useEffect(()=> {
        getCategories();
    },
    [])

  const handleCatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
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
      <label className="pr-4 w-full">Category</label>
      
      <div className="flex flex-row items-center gap-2">
        <select
        value={selectedCategory}
        className="px-2 w-4/5 text-black"
        onChange={handleCatChange}
      >
        <option value="">Choose category</option>
        
        { categories.map((category, index) => (
        <option key={index} value={category.category}>{category.category}</option>
        ))}
      </select>
      <button onClick={handleAddCategory} className="text-lg text-teal-600">
      <LuPlus />
      </button>
      </div>

      <div>
        {frmCategories.map((category, index) => (
          <div key={index} className="flex items-center text-yellow-400  pt-1">
            <p>{category}</p>
            <button onClick={() => handleDeleteCategory(category)}>x</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddCategory;
