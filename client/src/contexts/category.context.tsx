/* eslint-disable react-refresh/only-export-components */
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Category, CategoryContext } from "../interfaces/category.interface";


const defaultValues = {
  categories: [],
  setCategories: () => {},
  getCategories: () => {},
  getCategory: () => {},
};

export const CategoryContextValues =
  createContext<CategoryContext>(defaultValues);

export const useSocket = () => useContext(CategoryContextValues);

//---------------------- Provider begins here

function CategoryProvider({ children }: PropsWithChildren) {
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = async () => {
    const res = await fetch("http://localhost:3000/api/categories");
    const data = await res.json();

    setCategories(data);    
  };

  const getCategory = async (id: string) => {
    const res = await fetch(`/api/categories/${id}`);
    console.log(res,1);

    const data = await res.json();
console.log(data, 2);

    return data;
  };


  return (
    <CategoryContextValues.Provider
      value={{
        categories,
        getCategories,
        getCategory
      }}
    >
      {children}
    </CategoryContextValues.Provider>
  );
}

export default CategoryProvider;