/* eslint-disable react-refresh/only-export-components */
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Category, CategoryContext } from "../interfaces/category.interface";
// importing custom types/interfaces from the category interface file

// default values for the CategoryContext
const defaultValues = {
  categories: [],
  setCategories: () => {},
  getCategories: () => {},
  getCategory: () => {},
};

// creating a context to manage category-related state
export const CategoryContextValues =
  createContext<CategoryContext>(defaultValues);

// custom hook to access the category context
export const useSocket = () => useContext(CategoryContextValues);

//---------------------- Provider begins here

function CategoryProvider({ children }: PropsWithChildren) {
  // initializing state for categories
  const [categories, setCategories] = useState<Category[]>([]);

  // function to fetch all categories from the server
  const getCategories = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/categories");
      const data = await res.json();

      // update the state with the fetched categories
      setCategories(data);
    } catch (err) {
      // handle errors, if any
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
      // handle errors, if any
      if (err instanceof Error) {
        console.error(`Error fetching category with ID ${id}`, err.message);
      }
    }
  };

  // render the CategoryContextValues.Provider with the category-related functions and state as values
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

// exporting the CategoryProvider component as the default export
export default CategoryProvider;
