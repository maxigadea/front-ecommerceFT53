import Card from '@/components/Card/Card';
import { getProductsByCategory } from '@/helpers/products.helper';
import Link from 'next/link';
import React from 'react'

const Categories = async ({params}: {params: {categories: string}}) => {
    const {categories} = params;
    const products = await getProductsByCategory(categories)
  return (
    <div className='flex flex-wrap items-center gap-4 p-4 justify-center mt-4'>
        {products && products.map((product) => {
            return (
                <Link href={`/product/${product.id}`} key={product.id}>
                        <Card
                            {...product}
                        />
                </Link>
            )
        })}
    </div>
  )
}

export default Categories;