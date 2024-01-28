// import formatDate from "../../../../functions/date.formatter";
// import { Order } from "../../../../interfaces/order.interface";
// import { useSocket as orderSocket } from "../../../../contexts/order.context";
// import ViewInDetailCancelBtn from "../_sharedComponents/View.in.detail.cancelBtn";



// /* COMPONENT THAT RENDERS OUT A COMPLETE ORDER */

// const MyOrders = () => {

//   const { viewOrderDetails } = orderSocket();
//   // const [disableForm, setDisableForm] = useState<boolean>(true);


//   return (
//     <div>

//       <form className="w-full text-sm flex flex-col gap-2 pb-6 text-gray-400">
//         <div className="flex flex-row items-center gap-2 uppercase">
//           <label className="w-20">id</label>
//           <input
//             type="text"
//             disabled={true}
//             defaultValue={(viewOrderDetails as Order)._id}
//             className="w-full standard-form-darkmode"
//           />
//         </div>

//         <div className="flex flex-row items-center gap-2 uppercase">
//           <label className="w-20">date</label>
//           <input
//             type="text"
//             disabled={true}
//             defaultValue={formatDate((viewOrderDetails as Order).date)}
//             className="w-full standard-form-darkmode"
//           />
//         </div>

//         <div className="flex flex-row items-center gap-2 uppercase">
//           <label className="w-20">cust. id</label>
//           <input
//             type="text"
//             disabled={true}
//             defaultValue={(viewOrderDetails as Order).customer}
//             className="w-full text-gray-400 standard-form-darkmode"
//           />
//         </div>

//         <div className="flex flex-row items-center gap-2 uppercase">
//           <label className="w-20">name</label>
//           <input
//             type="text"
//             disabled={disableForm}
//             onChange={(e) => setCustName(e.target.value)}
//             defaultValue={(viewOrderDetails as Order).address.cust_name}
//             className="w-full text-gray-400 standard-form-darkmode"
//           />
//         </div>

//         <SingleOrderAddress
//           address={(viewOrderDetails as Order).address}
//           setNewStreet={setNewStreet}
//           setNewZipCode={setNewZipCode}
//           setNewCity={setNewCity}
//           disableForm={disableForm}
//         />

//         <SingleOrderProducts singleOrder={(viewOrderDetails as Order).order} />

//         <SingleOrderDiscount discount={(viewOrderDetails as Order).discount} />

//         <div className="flex flex-row items-center justify-between gap-2 uppercase">
//           <label>Order Total</label>
//           <div className="flex flex-row justify-end items-center gap-1">
//             <input
//               type="text"
//               disabled={true}
//               defaultValue={(viewOrderDetails as Order).total_price}
//               className="w-32 text-right standard-form-darkmode"
//             />
//             <p className="w-12 text-right">.00 sek</p>
//           </div>
//         </div>

//         <SingleOrderShipped
//           shipped={(viewOrderDetails as Order).shipped}
//           disableForm={disableForm}
//           newShipped={newShipped}
//           setNewShipped={setNewShipped}
//         />

//         <SingleOrderReturned
//           returned={(viewOrderDetails as Order).returned}
//           disableForm={disableForm}
//           newReturned={newReturned}
//           setNewReturned={setNewReturned}
//         />

//         <div className="flex flex-row items-center gap-2 uppercase">
//           <label className="w-40">Payment Status</label>
//           <input
//             type="text"
//             disabled={true}
//             defaultValue={(viewOrderDetails as Order).payment_status}
//             className="w-full standard-form-darkmode"
//           />
//         </div>

//         <div className="flex flex-row items-center gap-2 uppercase">
//           <label className="w-40">Order Status</label>
//           <input
//             type="text"
//             disabled={true}
//             defaultValue={(viewOrderDetails as Order).order_status}
//             className="w-full text-left standard-form-darkmode"
//           />
//         </div>
//       </form>

//       <ViewInDetailCancelBtn />
      
//     </div>
//   );
// };

// export default MyOrders;