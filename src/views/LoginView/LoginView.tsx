'use client'
import { useAuth } from '@/context/AuthContext';
import { login } from '@/helpers/auth.helper';
import { validateLoginForm } from '@/helpers/validate';
import { IErrorsProps, ILoginProps } from '@/interfaces/types';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const LoginView: React.FC = () => {
    const {setUserData} = useAuth();
    const router = useRouter();
    const initialState = {
        email: "",
        password: ""
    }

    const [dataUser, setdataUser] = useState<ILoginProps>(initialState);
    const [errors, setErrors] = useState<IErrorsProps>(initialState);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setdataUser({
            ...dataUser,
            [name]: value
        })
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const response = await login(dataUser)
        const {token, user} = response;
        setUserData({token, user})
        
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
            title: "Login in successfully"
        });

        router.push("/")
    }

    useEffect(() => {
        const errors = validateLoginForm(dataUser)
        setErrors(errors)
    }, [dataUser])


  return (
    <div>
        <div>
            <h1>Sign in to X STORE</h1>
        </div>

        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='email_address'>Email:</label>
                <input 
                    id="email_address"
                    type='email'
                    name="email"
                    value={dataUser.email}
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
                    value={dataUser.password}
                    placeholder='********'
                    onChange={handleChange}
                />
                {errors.password && <span>{errors.password}</span>}
            </div>

            <button disabled={errors.email ? true : false} type='submit'>Sign In</button>
        </form>
    </div>
  )
}

export default LoginView