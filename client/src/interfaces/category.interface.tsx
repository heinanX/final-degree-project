export interface CategoryContext {
  categories: Category[];
  getCategories: () => void;
  getCategory: (id: string) => void;
}

export interface Category {
  category: string[];
}

export interface CategoryModel {
  _id: string;
  category: string;
}
