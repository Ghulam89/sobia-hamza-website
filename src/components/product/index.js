import React from 'react'
import CartProduct from './CartProduct'

export const Products = () => {
  return (
    <div className=' py-12'>
       <div className=' pb-10 text-center'>
       <h3 className=' text-black font-semibold  text-2xl'> Best Sellers</h3>
       </div>
        <CartProduct/>
        
    </div>
  )
}
