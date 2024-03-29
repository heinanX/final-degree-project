/* eslint-disable react-refresh/only-export-components */
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Product,
  ProductContext,
  defaultValues,
} from "../interfaces/product.interface";

import { CategoryModel } from "../interfaces/category.interface";
import { Tags } from "../interfaces/tags.interface";
export const ProductContextValues =
  createContext<ProductContext>(defaultValues);
export const useSocket = () => useContext(ProductContextValues);


//---------------------- Provider begins here

function ProductProvider({ children }: PropsWithChildren) {
  const [products, setProducts] = useState<Product[]>([]);
  const [productToRelate, setProductToRelate] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [viewProductDetails, setViewProductDetails] = useState<Product | null>(
    null
  );

  // function to fetch all products from the server
  
  const getProducts = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/products");
      const data = await res.json();

      if (!res.ok) throw new Error("Failed to fetch products");
      setProducts(data);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error fetching products", err.message);
      }
    }
  };

  /*
   * Function to fetch a specific product from the server,
   * along with its associated category and tag information.
   */
  const getProductById = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`);
      const data = await response.json();

      if (!response.ok) throw new Error("Failed to fetch product");

      const categoryIds = data.category;
      const categoryData = await Promise.all(
        categoryIds.map(async (categoryId: CategoryModel) => {
          const categoryRes = await fetch(`/api/categories/${categoryId}`);
          const category = await categoryRes.json();
          return category;
        })
      );

      const tagIds = data.tags;
      const tagData = await Promise.all(
        tagIds.map(async (tagId: Tags) => {
          const tagRes = await fetch(`/api/tags/${tagId}`);
          const tag = await tagRes.json();
          return tag;
        })
      );

      setProductToRelate({ ...data, category: categoryData, tags: tagData });
      return {...data, category: categoryData, tags: tagData};
    } catch (err) {
      console.error("Error fetching product", err);
    }
  };

  /*
   * Function to fetch related products based on a search criteria
   */
  const getProductBySearchCriteria = async (id: string, criteria: string) => {
    try {
      const res = await fetch(`/api/products/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [criteria]: { $in: [id] },
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setRelatedProducts(data);
      }
    } catch (err) {
      console.error("Error fetching related products", err);
    }
  };

  const [newUpdatedProduct, setNewUpdatedProduct] = useState<object | null>(
    null
  );

  // Function to update product information in edit mode

  const updateProduct = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | object,
    property: string
  ) => {
    const targetValue =
      property === "description"
        ? (e as React.ChangeEvent<HTMLTextAreaElement>).target.value
        : (e as React.ChangeEvent<HTMLInputElement>).target.value;
    setNewUpdatedProduct((prevState) => ({
      ...prevState,
      [property]: targetValue,
    }));
  };

  // Function to update product information in the database

  const updateProductDatabase = async (
    updateProductObject: object,
    id: string
  ) => {
    try {
      const res = await fetch(`/api/products/edit-product/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateProductObject),
      });
      const data = await res.json();
      if (res.ok) {
        setViewProductDetails(data);
        getProducts();
      }
    } catch (err) {
      console.error("Error updating product", err);
    }
  };

  const deleteProductDatabase = async (id: string) => {
    try {
      const res = await fetch(`/api/products/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        return data;
      }
    } catch (err) {
      console.error("Error updating product", err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (
      productToRelate &&
      Array.isArray(productToRelate.category) &&
      productToRelate.category.length > 0
    ) {
      //@ts-expect-error: the array has an index of 0 as it has a length bigger than 0
      const firstCategory = productToRelate.category[0]._id;
      getProductBySearchCriteria(firstCategory, "category");
    }
  }, [productToRelate]);

  return (
    <ProductContextValues.Provider
      value={{
        products,
        setProducts,
        getProducts,
        getProductById,
        productToRelate,
        getProductBySearchCriteria,
        viewProductDetails,
        setViewProductDetails,
        newUpdatedProduct,
        setNewUpdatedProduct,
        updateProduct,
        updateProductDatabase,
        relatedProducts,
        setRelatedProducts,
        deleteProductDatabase,
      }}
    >
      {children}
    </ProductContextValues.Provider>
  );
}

export default ProductProvider;
