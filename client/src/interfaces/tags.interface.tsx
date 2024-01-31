export interface TagContext {
  tags: Tag[];
  getTags: () => void;
  getTag: (tag: string) => void;
}

export interface Tags {
  id: string;
  tag: string;
}
export interface Tag {
  tags: [];
}
