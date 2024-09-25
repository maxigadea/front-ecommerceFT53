'use client'
import { useAuth } from '@/context/AuthContext';
import { getOrders } from '@/helpers/orders.helper';
import { IOrder } from '@/interfaces/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const OrdersView = () => {
  const router = useRouter()
  const [orders, setOrders] = useState<IOrder[]>([]);
  const { userData } = useAuth();

  const fetchData = async () => {
    const ordersResponse = await getOrders(userData?.token!)
    setOrders(ordersResponse)
  }

  useEffect(() => {
    if(userData?.user.name) {
      userData?.user.name === undefined ? router.push("/login") : fetchData()
    }
  }, [userData?.user])


  return (
    <div>{
      orders && orders.length > 0 ? (
        orders?.map((orders: IOrder) => {
          return (
            <div className='flex flex-row items-center gap-4' key={orders.id}>
                <section>
                  <p>{new Date(orders.date)?.toLocaleDateString()}</p>
                  <p>Status: {orders.status.toLocaleUpperCase()}</p> 
                </section>
            </div>
          )
        })
      ) : (
        <>
          <p>You dont have any products in your orders</p>
          <Link className='rounded-lg border p-2' href="/">
                Shopping
          </Link>
        </>
      )
    }</div>
  )
}

export default OrdersView