export interface CategoryContext {
  categories: Category[];
  getCategories: () => void;
  getCategory: (id: string) => void;
}


export interface Category {
  category: [];
}

export interface CategoryTwo {

    _id: string,
    category: string

}
