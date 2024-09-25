import React from 'react'
import { ICardProps } from './types'

const Card:React.FC<ICardProps> = ({name, price, stock, image}) => {
  return (
    <div className='flex flex-row items-center rounded-lg gap-4 justify-center border p-2 w-[240px] h-[200px] transition duration-500 hover:scale-105'>
        <img className='max-w-[120px] w-full h-auto' src={image} alt="imagen del producto" />
        <div className='flex flex-col w-full h-full items-center justify-center gap-6'>
            <h2 className='font-semibold text-xs'>{name}</h2>
            <p className='text-xs'>Stock: {stock}</p>
            <p className='text-xs'>Price: ${price}</p>
        </div>
    </div>
  )
}

export default Card;