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

  // function to fetch all categories from the server
  const getCategories = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/categories");
      const data = await res.json();

      setCategories(data);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error fetching categories", err.message);
      }
    }
  };

  // function to fetch a specific category by ID from the server
  const getCategory = async (id: string) => {
    try {
      const res = await fetch(`/api/categories/${id}`);
      const data = await res.json();
      return data;
    } catch (err) {
      if (err instanceof Error) {
        console.error(`Error fetching category with ID ${id}`, err.message);
      }
    }
  };

  return (
    <CategoryContextValues.Provider
      value={{
        categories,
        getCategories,
        getCategory,
      }}
    >
      {children}
    </CategoryContextValues.Provider>
  );
}

export default CategoryProvider;
