import { useEffect, useState } from "react";

import AddTag from "./Add.tag";
import AddCategory from "./Add.category";

/* COMPONENT THAT RENDERS AN ADD PRODUCT FORM
  - still a WIP
*/

const AddProduct = () => {
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
  }, [
    frmTitle,
    frmDescription,
    frmYear,
    frmImage,
    frmVhsPrice,
    frmCategories,
    frmVhsQuantity,
    frmDigitalPrice,
  ]);

  return (
    <form
      className="flex flex-col gap-2 py-2 px-4 text-sm"
      onSubmit={(e) => handleForm(e)}
    >
      <div className="flex">
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
      <div className="flex">
        <div className="w-1/2">
          {checkVideo ? (
            <>
              <div className="flex flex-col gap-1">
                <label>VHS Price</label>
                <input
                  type="number"
                  name="frmVhsPrice"
                  className="rounded-sm text-black pl-2 w-4/5"
                  placeholder="price"
                  onChange={(e) => setFrmVhsPrice(parseInt(e.target.value))}
                />
                <label>VHS Quantity</label>
                <input
                  type="number"
                  name="vhsQuant"
                  className="rounded-sm text-black pl-2 w-4/5"
                  placeholder="quantity"
                  onChange={(e) => setFrmVhsQuantity(parseInt(e.target.value))}
                />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="w-1/2">
          {checkDigital ? (
            <>
              <div className="flex flex-col gap-1">
                <label> Digital Price</label>
                <input
                  type="number"
                  name="digital.price"
                  className="rounded-sm text-black pl-2 w-4/5"
                  placeholder="price"
                  onChange={(e) => setFrmDigitalPrice(parseInt(e.target.value))}
                />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* ------------------------ IMAGE INPUT */}
      <div className="flex flex-col">
        <label>frmImage</label>
        <input
          type="text"
          placeholder="http://"
          className="px-2"
          onChange={(e) => setFrmImage(e.target.value)}
        />
      </div>

      {/* ------------------------ YEAR INPUT */}

      <div className="flex flex-col">
        <label className="pr-4">Year</label>
        <select
          value={frmYear}
          className="px-2 text-black"
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

      <AddCategory
        frmCategories={frmCategories}
        setFrmCategories={setFrmCategories}
      />

      {/* ------------------------ TAG INPUT */}

      <AddTag frmTags={frmTags} setFrmTags={setFrmTags} />

      {/* ------------------------ TITLE INPUT */}

      <div className="flex flex-col">
        <label className="pr-4">Title</label>
        <input
          className="rounded-sm text-black px-2"
          type="text"
          name="frmTitle"
          onChange={(e) => setNewTitle(e.target.value)}
        />
      </div>

      {/* ------------------------ DESCRIPTION */}

      <div className="flex flex-col">
        <label className="pr-4">frmDescription</label>
        <textarea
          className="p-2 text-black"
          rows={3}
          placeholder="add a frmDescription"
          style={{ resize: "none" }}
          name="frmDescription"
          onChange={(e) => setNewDescription(e.target.value)}
        />
      </div>

      {/* ------------------------ SUBMIT INPUT */}

      <div>
        <button className="standard-btn" type="submit">
          Create Product
        </button>
      </div>
    </form>
  );
};

export default AddProduct;
