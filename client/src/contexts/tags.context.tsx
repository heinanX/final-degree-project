/* eslint-disable react-refresh/only-export-components */
import {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { TagContext, Tag, Tags } from "../interfaces/tags.interface";

const defaultValues = {
  tags: [],
  setTags: () => {},
  getTags: () => {},
  getTag: () => {},
};

export const TagContextValues = createContext<TagContext>(defaultValues);

export const useSocket = () => useContext(TagContextValues);

//---------------------- Provider begins here

function TagProvider({ children }: PropsWithChildren) {
  const [tags, setTags] = useState<Tag[]>([]);

  const getTags = async () => {
    const res = await fetch("http://localhost:3000/api/tags");
    const data = await res.json();

    setTags(data);
  };

  const getTag = async (tag: string) => {
    const res = await fetch("http://localhost:3000/api/tags");
    const data = await res.json();

    const collected = data.find((item: Tags) => item.tag === tag);

    if (!collected) {
      const createTagRes = await fetch("/api/tags/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tag: tag,
        }),
      });
      if (createTagRes.ok) {
        const newTag = await createTagRes.json();
        console.log(newTag);
      }
    }
    console.log(collected);
  };

  return (
    <TagContextValues.Provider
      value={{
        tags,
        getTags,
        getTag,
      }}
    >
      {children}
    </TagContextValues.Provider>
  );
}

export default TagProvider;
