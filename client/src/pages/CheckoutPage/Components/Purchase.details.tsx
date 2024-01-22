import { useSocket as cartSocket } from "../../../contexts/cart.context";
import { useSocket as customerSocket } from "../../../contexts/customer.context";
import { useEffect, useState } from "react";

const PurchaseDetails = () => {
  const { handleCheckout,  } = cartSocket();
  const { activeCustomer, fetchCustomerDetails } = customerSocket();
  const  [customerName, setCustomerName ] = useState('');
  const  [street, setStreet ] = useState('');
  const  [zipCode, setZipCode ] = useState('');
  const  [city, setCity ] = useState('');


  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
    const addressee = {
      cust_name: customerName,
      street: street,
      zip_code: zipCode,
      city: city
    }

    handleCheckout(addressee);
  };

  useEffect(() => {
    fetchCustomerDetails()
  }, [])

  const labelCss = "text-white";
  const inputCss = "h-8 py-1 px-2 mb-2";
  return (
    <form className="w-1/2 flex flex-col px-4" onSubmit={(e) => submitForm(e)}>
      <label className={labelCss}>Mail</label>
      <input type="text" placeholder="mail" className={inputCss} defaultValue={activeCustomer} disabled />
      <label className={labelCss}>Name</label>
      <input type="text" placeholder="name" className={inputCss} value={customerName} onChange={(e) => setCustomerName(e.target.value)}/>
      <label className={labelCss}>Address</label>
      <input type="text" placeholder="street" className={inputCss} value={street} onChange={(e) => setStreet(e.target.value)} />
      <input type="text" placeholder="zip code" className={inputCss} value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
      <input type="text" placeholder="city" className={inputCss} value={city} onChange={(e) => setCity(e.target.value)} />
      <button type="submit" className="standard-btn mt-6">
        Proceed to payment
      </button>
    </form>
  );
};

export default PurchaseDetails;
