import logo from '../../../assets/images/logo-videoshack_tape.png';
const OrderDetails = () => {
  return (
    <>
    <img src={logo} alt="" />
    <h1 style={{ fontWeight: "800" }}>Thank You For Your Order!</h1>
    <p style={{ color: "rgb(100, 100, 100)" }}>
      It is now being processed and will arrive shortly
    </p>
    <div className="orderDataContainer">

    </div>
    </>

  )
}

export default OrderDetails