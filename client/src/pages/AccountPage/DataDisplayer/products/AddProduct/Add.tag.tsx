import { useEffect, useState } from "react";
import { useSocket as tagSocket } from "../../../../../contexts/tags.context";
import { LuPlus } from "react-icons/lu";

interface props {
  frmTags: string[];
  setFrmTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const AddTag = ({ frmTags, setFrmTags }: props) => {
  const [selectedTag, setSelectedTag] = useState<string>("");
  const { getTag, tags } = tagSocket();

  //   const addTags = () => {
  //     setFrmTags((prevTags) => [...prevTags, selectedTag]);
  //     setSelectedTag("");
  //   };

  console.log(tags);

  const handleAddTag = () => {
    getTag(selectedTag); // Call the getTag function here if needed
    setFrmTags((prevTags) => [...prevTags, selectedTag]);
    setSelectedTag("");
  };

  const handleDeleteTag = (deleteTag: string) => {
    setFrmTags((prevTags) => prevTags.filter((tag) => tag !== deleteTag));
  };

  useEffect(() => {
    console.log(selectedTag);
    console.log(frmTags);
  }, [selectedTag, frmTags]);

  return (
    <div>
      <div className="flex flex-col">
        <label>Tags</label>
        <div className="flex flex-row items-center gap-2">
          <input
            type="text"
            className="pl-2 w-4/5 text-black"
            placeholder="add tags"
            onChange={(e) => setSelectedTag(e.target.value)}
          />
          <button onClick={handleAddTag}  className="text-lg text-teal-600">
          <LuPlus />
          </button>
        </div>
      </div>

      <div>
        {frmTags.map((tag, index) => (
          <div key={index} className="flex items-center gap-1 text-yellow-400 pt-1">
            <span>{tag}</span>
            <button onClick={() => handleDeleteTag(tag)}>x</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddTag;
