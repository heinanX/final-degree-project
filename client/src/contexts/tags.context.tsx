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
  // initializing state for tag-related information
  const [tags, setTags] = useState<Tag[]>([]);

  // function to fetch all tags from the server

  const getTags = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/tags");
      const data = await res.json();

      setTags(data);
    } catch (err) {
      console.error("Error fetching tags", err);
    }
  };

  // function to fetch a specific tag or create it if it doesn't exist
  const getTag = async (tag: string) => {
    try {
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
    } catch (err) {
      console.error("Error fetching or creating tag", err);
    }
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
