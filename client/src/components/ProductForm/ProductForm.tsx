import { useEffect, useState } from "react";

import Tag from "./Tag";
import AddCategory from "./AddCategory";
//import AddTag from "./AddTag";

const ProductForm = () => {
  const [frmTitle, setNewTitle] = useState("");
  const [frmDescription, setNewDescription] = useState("");
  const [frmYear, setFrmYear] = useState(1990);
  const [frmImage, setFrmImage] = useState("");
  const [frmVhsPrice, setFrmVhsPrice] = useState(0);
  const [frmVhsQuantity, setFrmVhsQuantity] = useState(0);
  const [frmDigitalPrice, setFrmDigitalPrice] = useState(0);
  const [frmCategories, setFrmCategories] = useState<string[]>([]);
  const [frmTags, setFrmTags] = useState<string[]>([]);


  const [checkVideo, setCheckVideo] = useState(false);
  const [checkDigital, setCheckDigital] = useState(false);
  const years = Array.from({ length: 151 }, (_, index) => 1900 + index);


  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    console.log(frmCategories);
  }, [frmTitle, frmDescription, frmYear, frmImage, frmVhsPrice, frmCategories, frmVhsQuantity, frmDigitalPrice]);

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
                    name="frmVhsPrice"
                    className="rounded-sm text-black pl-2 w-16"
                    placeholder="price"
                    onChange={(e) => setFrmVhsPrice(parseInt(e.target.value))}
                  />
                  VHS Price
                </label>
                <label>
                  <input
                    type="number"
                    name="vhsQuant"
                    className="rounded-sm text-black pl-2 w-16"
                    placeholder="quantity"
                    onChange={(e) => setFrmVhsQuantity(parseInt(e.target.value))}
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
                    onChange={(e) => setFrmDigitalPrice(parseInt(e.target.value))}
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
        <label className="pr-4">frmImage</label>
        <input
          type="text"
          placeholder="http://"
          onChange={(e) => setFrmImage(e.target.value)}
        />
      </div>
            
      {/* ------------------------ YEAR INPUT */}

      <div>
        <label className="pr-4">Year</label>
        <select
          value={frmYear}
          className="px-2"
          onChange={(e) => setFrmYear(parseInt(e.target.value))}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* ------------------------ CATEGORY INPUT */}

      <AddCategory frmCategories={frmCategories} setFrmCategories={setFrmCategories} />

     
      {/* ------------------------ TAG INPUT */}

            <Tag frmTags={frmTags} setFrmTags={setFrmTags} />


      {/* ------------------------ TITLE INPUT */}

      <div className="">
        <label className="pr-4">Title</label>
        <input
          className="rounded-sm text-black px-2"
          type="text"
          name="frmTitle"
          onChange={(e) => setNewTitle(e.target.value)}
        />
      </div>

      {/* ------------------------ DESCRIPTION */}

      <div>
        <label className="pr-4">frmDescription</label>
        <textarea
          className="p-2"
          rows={3}
          placeholder="add a frmDescription"
          style={{ resize: "none" }}
          name="frmDescription"
          onChange={(e) => setNewDescription(e.target.value)}
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
