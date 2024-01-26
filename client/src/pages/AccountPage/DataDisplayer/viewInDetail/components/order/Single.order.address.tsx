import React from "react";
import { OrderAddress } from "../../../../../../interfaces/order.interface";

interface SingleOrderAddressProps {
  address: OrderAddress;
  setNewStreet: React.Dispatch<React.SetStateAction<string>>;
  setNewZipCode: React.Dispatch<React.SetStateAction<string>>;
  setNewCity: React.Dispatch<React.SetStateAction<string>>;
  disableForm: boolean;
}

/* COMPONENT THAT RENDERS ADDRESS FIELDS IN 'VIEW SINGLE ORDER' */

const SingleOrderAddress = ({
  address,
  disableForm,
  setNewStreet,
  setNewZipCode,
  setNewCity,
}: SingleOrderAddressProps) => {

  // determine css for editable input fields based on disableForm status
  const changeTextcolor = disableForm ? "" : "text-white";

  return (
    <div className={`flex flex-row gap-2 uppercase ${changeTextcolor}`}>
      <label className="w-20 pt-1">address</label>
      <div className="flex flex-col gap-2 w-full ml-10 text-gray-400">

        {/* STREET INPUT */}
        <input
          type="text"
          disabled={disableForm} //based on state status [when set to true] form is disabled
          defaultValue={address.street} //default value from order
          onChange={(e) => setNewStreet(e.target.value)} //onchange that resets state with new value
          className={`w-full standard-form-darkmode ${changeTextcolor}`} //classes
        />
        
        {/* ZIP CODE INPUT */}
        <input
          type="text"
          disabled={disableForm}
          defaultValue={address.zip_code}
          onChange={(e) => setNewZipCode(e.target.value)}
          className={`w-full standard-form-darkmode ${changeTextcolor}`}
        />

        {/* CITY INPUT */}
        <input
          type="text"
          disabled={disableForm}
          defaultValue={address.city}
          onChange={(e) => setNewCity(e.target.value)}
          className={`w-full standard-form-darkmode ${changeTextcolor}`}
        />
      </div>
    </div>
  );
};

export default SingleOrderAddress;
