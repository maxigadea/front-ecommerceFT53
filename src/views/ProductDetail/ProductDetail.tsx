'use client'
import { useAuth } from '@/context/AuthContext';
import { IProduct } from '@/interfaces/types'
import { useRouter } from 'next/navigation';
import React from 'react'
import Swal from 'sweetalert2';

const ProductDetail: React.FC<IProduct> = ({name, image, description, price, stock, id, categoryId}) => {
  const router = useRouter();
  const { userData } = useAuth();

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

  const handleAddToCart = () => {
    if(!userData?.token) {
        Toast.fire({
          icon: "error",
          title: "You must be logged to add products"
      });
    } else {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]")
      const productExist = cart.some((product: IProduct) => {
        if(product.id === id) return true;
        return false
      })
      if(productExist) {
        Toast.fire({
          icon: "warning",
          title: "This product already exist in your cart"
        });
        router.push("/cart")
      } else {
        cart.push({
          name, description, image, price, stock, categoryId, id
        })
        localStorage.setItem("cart", JSON.stringify(cart))
        Toast.fire({
          icon: "success",
          title: "Product added to your cart"
        });
      }
    }
  }

  return (
    <div>
        <h2>{name}</h2>
        <img src={image} alt={`Imagen del producto ${name}`} />
        <p>{description}</p>
        <p>Precio: ${price}</p>
        <p>Stock: {stock}</p>
        <button onClick={handleAddToCart}>Add to cart</button>
    </div>
  )
}

export default ProductDetail