'use client'
import { createOrder } from '@/helpers/orders.helper';
import { IProduct, IUserSession } from '@/interfaces/types';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const CartView = () => {

  const [cart, setCart] = useState<IProduct[]>([]);
  const [totalCart, setTotalCart] = useState<number>(0)
  const [userData, setUserData] = useState<IUserSession>()

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

    useEffect(() => {
        if(typeof window !== "undefined" && window.localStorage) {
           const storedCart = JSON.parse(localStorage.getItem("cart") || "[]")
           if(storedCart) {
              let totalCart = 0;
              storedCart?.map((item: IProduct) => {
                totalCart = totalCart + item.price
              })
              setTotalCart(totalCart);
              setCart(storedCart)
           }
        }
    }, [])

    useEffect(() => {
      if(typeof window !== "undefined" && window.localStorage) {
        const userData = JSON.parse(localStorage.getItem("userSession")!) 
        setUserData(userData)
      }
  }, [])

    const handleClick = async () => {
      const idProducts = cart?.map((product) => product.id)
      await createOrder(idProducts, userData?.token!)
      Toast.fire({
        icon: "success",
        title: "Buy successfully"
      });
      setCart([])
      setTotalCart(0)
      localStorage.setItem("cart", "[]")
    }

  return (
    <div className='flex flex-row items-center justify-between w-full p-4'>
      <div>
        {
          cart && cart.length > 0 ? (
            cart?.map((cart: IProduct) => {
              return (
                <div className='flex flex-row items-center gap-4 ' key={cart.id}>
                    <img className='!max-w-[80px] w-[80px] h-auto' width={60} height={80} src={cart.image} alt={" Image of the product " + cart.name} />
                    <section>
                      <p>{cart.name}</p>
                      <p>Price: ${cart.price}</p> 
                    </section>
                </div>
              )
            })
          ) : (
            <p>You dont have any products in your cart</p>
          )
        }
      </div>

      <div>
        <p>Your total: ${totalCart}</p>
        {
          cart.length <= 0 ? (
            <Link className='rounded-lg border p-2' href="/">
              Shopping
            </Link>
          ) : (
            <button onClick={handleClick} className='rounded-lg border p-2'>Checkout</button>
          )
        }
        
      </div>
    </div>
  )
}

export default CartView