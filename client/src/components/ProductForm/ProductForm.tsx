import { useEffect, useState } from "react";
import GenreForm from "./addCategory";
import AddTag from "./AddTag";

const ProductForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState(1990);
  const [image, setImage] = useState("");
  const [vhsPrice, setVhsPrice] = useState(0);
  const [vhsQuantity, setVhsQuantity] = useState(0);
  const [digitalPrice, setDigitalPrice] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);


  const [checkVideo, setCheckVideo] = useState(false);
  const [checkDigital, setCheckDigital] = useState(false);
  const years = Array.from({ length: 151 }, (_, index) => 1900 + index);


  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    console.log(categories);
  }, [title, description, year, image, vhsPrice, categories, vhsQuantity, digitalPrice]);

  return (
    <form
      className="flex flex-col gap-2 py-2 px-4"
      onSubmit={(e) => handleForm(e)}
    >
      <div>
        <label>VHS</label>
        <input
          className="ml-2"
          type="checkbox"
          name="vhs"
          checked={checkVideo}
          onChange={() => setCheckVideo(!checkVideo)}
        />
        <label className="pl-6">Digital</label>
        <input
          className="ml-2"
          type="checkbox"
          name="digital"
          checked={checkDigital}
          onChange={() => setCheckDigital(!checkDigital)}
        />
      </div>
      <div className="flex flex-row">
        <div className="bg-red-400 w-1/3">
          {checkVideo ? (
            <>
              <div className="flex flex-col gap-2">
                <label>
                  <input
                    type="number"
                    name="vhsPrice"
                    className="rounded-sm text-black pl-2 w-16"
                    placeholder="price"
                    onChange={(e) => setVhsPrice(parseInt(e.target.value))}
                  />
                  VHS Price
                </label>
                <label>
                  <input
                    type="number"
                    name="vhsQuant"
                    className="rounded-sm text-black pl-2 w-16"
                    placeholder="quantity"
                    onChange={(e) => setVhsQuantity(parseInt(e.target.value))}
                  />
                  VHS Quantity
                </label>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="bg-green-400 w-1/3">
          {checkDigital ? (
            <>
              <div className="flex flex-col gap-2">
                <label>
                  <input
                    type="number"
                    name="digital.price"
                    className="rounded-sm text-black pl-2 w-16"
                    placeholder="price"
                    onChange={(e) => setDigitalPrice(parseInt(e.target.value))}
                  />
                  Digital Price
                </label>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* ------------------------ IMAGE INPUT */}
      <div>
        <label className="pr-4">image</label>
        <input
          type="text"
          placeholder="http://"
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
            
      {/* ------------------------ YEAR INPUT */}

      <div>
        <label className="pr-4">Year</label>
        <select
          value={year}
          className="px-2"
          onChange={(e) => setYear(parseInt(e.target.value))}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* ------------------------ CATEGORY INPUT */}

      <GenreForm categories={categories} setCategories={setCategories} />

     
      {/* ------------------------ TAG INPUT */}

      <AddTag tags={tags} setTags={setTags} />


      {/* ------------------------ TITLE INPUT */}

      <div className="">
        <label className="pr-4">Title</label>
        <input
          className="rounded-sm text-black px-2"
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* ------------------------ DESCRIPTION */}

      <div>
        <label className="pr-4">description</label>
        <textarea
          className="p-2"
          rows={3}
          placeholder="add a description"
          style={{ resize: "none" }}
          name="description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* ------------------------ SUBMIT INPUT */}

      <div>
        <button className="standard-btn" type="submit">Send data</button>
      </div>
    </form>
  );
};

export default ProductForm;
