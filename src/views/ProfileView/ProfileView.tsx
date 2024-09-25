'use client'
import Button from '@/components/CustomButton/Button'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import React from 'react'
import Swal from 'sweetalert2'

const ProfileView = () => {
  const router = useRouter();
  const { userData } = useAuth();
  
  const handleClick = ( ) => {
        localStorage.removeItem("userSession")
        
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
          Toast.fire({
            icon: "success",
            title: "Logout successfully"
        });

        router.push("/")
  } 

  return (
    <div>
        <h1>Tu perfil</h1>
        <h3>Bienvenido {userData?.user?.name}</h3>
        <p>Tu correo: {userData?.user?.email}</p>
        <p>Tu dirección de envio es: {userData?.user?.address}</p>
        <Button onClick={handleClick} disabled={false}>Desconectar</Button>
    </div>
  )
}

export default ProfileView