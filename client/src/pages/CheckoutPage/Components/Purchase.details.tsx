import { useSocket as cartSocket } from "../../../contexts/cart.context";


const PurchaseDetails = () => {
    const { handleCheckout } = cartSocket();

    const labelCss = 'text-white'
    const inputCss = 'h-8 py-1 px-2 mb-2'
  return (
    <form className='w-1/2 flex flex-col px-4'>
        <label className={labelCss}>Name</label>
        <input type="text" placeholder="name" className={inputCss} />
        <label className={labelCss}>Mail</label>
        <input type="text" placeholder="mail" className={inputCss} />
        <label className={labelCss}>Address</label>
        <input type="text" placeholder="street" className={inputCss} />
        <input type="text" placeholder="zip code" className={inputCss} />
        <input type="text" placeholder="city" className={inputCss} />
        <button onClick={handleCheckout} className="standard-btn mt-6">Proceed to payment</button>
    </form>
  )
}

export default PurchaseDetails