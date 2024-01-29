import React, { useEffect, useState } from 'react'
import { useSocket as cartSocket } from '../../../contexts/cart.context'
const CartIndicator = () => {
    const { newCart} = cartSocket();

    const [quantity, setQuantity] = useState<number>(0);

    const calculateQuantity = () => {
        let sum = 0;
        newCart.cart.map((item) => (
            sum += item.quantity
        ))
        setQuantity(sum)
    }

    useEffect(()=> {
        calculateQuantity()
    }, [newCart])
  return (
    <div id='cartIndicator' className='absolute text-sm bottom-3 left-4'>
        <p>{quantity}</p>
        
    </div>
  )
}

export default CartIndicator