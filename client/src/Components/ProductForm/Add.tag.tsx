import { useEffect, useState } from "react";
import { useSocket as productSocket } from "../../contexts/product.context";

interface props {
  frmTags: string[];
  setFrmTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const AddTag = ({ frmTags, setFrmTags }: props) => {
  const [selectedTag, setSelectedTag] = useState<string>("");
  const { getTag, tags } = productSocket();

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
      <div>
        {frmTags.map((tag, index) => (
          <div key={index} className="flex items-center">
            <span>{tag}</span>
            <button onClick={() => handleDeleteTag(tag)}>x</button>
          </div>
        ))}
      </div>

      <label>Tags</label>
      <input
        type="text"
        placeholder="add tags"
        onChange={(e) => setSelectedTag(e.target.value)}
      />
      <button onClick={handleAddTag}>+</button>
    </div>
  );
};

export default AddTag;
