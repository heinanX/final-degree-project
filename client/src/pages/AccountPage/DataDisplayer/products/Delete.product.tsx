import { useEffect, useState } from "react";
import { useSocket as productSocket } from "../../../../contexts/product.context";
import { Product } from "../../../../interfaces/product.interface";
import { FaRegTrashCan } from "react-icons/fa6";

/* A COMPONENT THAT RENDERS THE OPTION TO FETCH A PRODUCT AND THEN DELETE IT*/

const DeleteProduct = () => {

  const { getProductById, deleteProductDatabase} = productSocket();
  const [inputId, setInputId] = useState<string>('');
  const [fetchedProduct, setFetchedProduct] = useState<Product | void | null>(null);
  const [deletedDataRes, setDeletedDataRes] = useState<string | void>('');

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const productData = await getProductById(inputId)
    setFetchedProduct(productData);
  };

  const handleDelete = async (id: string) => {
    const deleteData = await deleteProductDatabase(id)
    setDeletedDataRes(deleteData)
  };


  useEffect(()=> {
    setInputId('')
  },[fetchedProduct])

  return (
    <div className="flex flex-col w-full p-20 gap-4">
      <p className="italic">enter an ID to find product</p>
      <form onSubmit={(e) => handleForm(e)} className="flex flex-col gap-4">
        <input type="text"
        className="standard-form-darkmode"
        onChange={(e) => setInputId(e.target.value)} />
        <button type="submit" className="standard-btn">
          Request Product
        </button>
      </form>
      {fetchedProduct ? 
      <div className="flex flex-row justify-center items-center gap-4">
      <p>{fetchedProduct.year}</p>
      <p>{fetchedProduct.title}</p>
      <button onClick={() => handleDelete(fetchedProduct._id)}>
      <FaRegTrashCan />
      </button>
      </div> : <></>}
      {deletedDataRes != '' ? <p>{deletedDataRes as string}</p> : <></>}
    </div>
  );
};

export default DeleteProduct;
