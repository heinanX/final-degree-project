interface SingleOrderDiscountProps {
    discount: number;
  }

  /* RENDERS COMPONENT THAT SHOWS ORDER DISCOUNT */
  
  const SingleOrderDiscount = ({ discount }: SingleOrderDiscountProps) => {
    return discount ? (
      <div className="flex flex-row items-center justify-between gap-2 uppercase">
        <label>Discount</label>
        <div className="flex flex-row justify-end items-center gap-1">
          <input
            type="text"
            disabled={true}
            defaultValue={discount}
            className="w-32 text-right standard-form-darkmode"
          />
          <p className="w-12 text-right">.00 sek</p>
        </div>
      </div>
    ) : (
      <></>
    );
  };
  
  export default SingleOrderDiscount;
  