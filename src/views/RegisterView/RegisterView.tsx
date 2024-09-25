'use client'
import { register } from '@/helpers/auth.helper';
import { validateRegisterForm } from '@/helpers/validate';
import { IRegisterErrors, IRegisterProps } from '@/interfaces/types';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const RegisterView: React.FC = () => {
    const router = useRouter();
    const initialState = {
        email: "",
        password: "",
        name: "",
        address: "",
        phone: ""
    }

    const [userData, setUserData] = useState<IRegisterProps>(initialState);
    const [errors, setErrors] = useState<IRegisterErrors>(initialState);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setUserData({
            ...userData,
            [name]: value
        })
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        await register(userData)

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
            title: "Registered in successfully"
        });

        router.push("/login")
    }

    useEffect(() => {
        const errors = validateRegisterForm(userData)
        setErrors(errors)
    }, [userData])


  return (
    <div>
        <div>
            <h1>Register in to X STORE</h1>
        </div>

        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='email_address'>Email:</label>
                <input 
                    id="email_address"
                    type='email'
                    name="email"
                    value={userData.email}
                    placeholder='johndoe@example.com'
                    onChange={handleChange}
                />
                {errors.email && <span>{errors.email}</span>}
            </div>

            <div>
                <label htmlFor='password'>Password:</label>
                <input 
                    id="password"
                    type='password'
                    name="password"
                    value={userData.password}
                    placeholder='********'
                    onChange={handleChange}
                />
                {errors.password && <span>{errors.password}</span>}
            </div>

            <div>
                <label htmlFor='name'>Name:</label>
                <input 
                    id="name"
                    type='text'
                    name="name"
                    value={userData.name}
                    placeholder='John Doe'
                    onChange={handleChange}
                />
                {errors.name && <span>{errors.name}</span>}
            </div>

            <div>
                <label htmlFor='address'>Address:</label>
                <input 
                    id="address"
                    type='text'
                    name="address"
                    value={userData.address}
                    placeholder='Posadas, Misiones'
                    onChange={handleChange}
                />
                {errors.address && <span>{errors.address}</span>}
            </div>

            <div>
                <label htmlFor='phone'>Phone:</label>
                <input 
                    id="phone"
                    type='text'
                    name="phone"
                    value={userData.phone}
                    placeholder='011-343434'
                    onChange={handleChange}
                />
                {errors.phone && <span>{errors.phone}</span>}
            </div>

            <button disabled={errors.email ? true : false} type='submit'>Register In</button>
        </form>
    </div>
  )
}

export default RegisterView