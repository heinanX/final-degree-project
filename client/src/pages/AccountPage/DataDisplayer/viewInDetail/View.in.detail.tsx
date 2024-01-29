import ViewSingleOrder from "./View.single.order";
import ViewInDetailProduct from "./components/View.in.detail.product";
import { useSocket as orderSocket } from "../../../../contexts/order.context";
import { useSocket as productSocket } from "../../../../contexts/product.context";
import { useState } from "react";

const ViewInDetail = () => {
  const { viewOrderDetails } = orderSocket();
  const { viewProductDetails } = productSocket();
  const [disableForm, setDisableForm] = useState<boolean>(true);

  return (
    <div>
      {viewOrderDetails ? (
        <ViewSingleOrder
          disableForm={disableForm}
          setDisableForm={setDisableForm}
        />
      ) : (
        <></>
      )}
      {viewProductDetails ? (
        <ViewInDetailProduct
          disableForm={disableForm}
          setDisableForm={setDisableForm}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ViewInDetail;
