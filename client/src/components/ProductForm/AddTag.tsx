import { useState } from "react";

interface props {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const AddTag = ({ tags, setTags }: props) => {
  const [selectedTag, setSelectedTag] = useState<string>("");

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTag(e.target.value);
  };

  const handleAddTag = () => {
    setTags((prevTags) => [...prevTags, selectedTag]);
    setSelectedTag("");
  };

  const handleDeleteTag = (deleteTag: string) => {
    setTags((prevTags) =>
      prevTags.filter((tag) => tag !== deleteTag)
    );
  };

  return (
    <div>
      <div>
        {tags.map((tag, index) => (
          <div key={index} className="flex items-center">
            <span>{tag}</span>
            <button onClick={() => handleDeleteTag(tag)}>x</button>
          </div>
        ))}
      </div>

      <label className="pr-4">Tags</label>
      <select value={selectedTag} className="px-2" onChange={handleTagChange}>
        <option value="">Choose Tags</option>
        <option value="comedy">Comedy</option>
        <option value="romance">Romance</option>
      </select>
      <button onClick={handleAddTag}>+</button>
    </div>
  );
};

export default AddTag;
