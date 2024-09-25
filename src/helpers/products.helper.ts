import { IProduct } from "@/interfaces/types";

const APIURL = process.env.NEXT_PUBLIC_API_URL

export async function getProductsDB(): Promise<IProduct[]> {
    try {
        const res = await fetch(`${APIURL}/products`, {
            next: { revalidate: 1200 }
        })
        const products: IProduct[] = await res.json();
        return products;
    } catch (error: any) {
        throw new Error(error)
    }
};

export async function getProductsById(id: string): Promise<IProduct> {
    try {
        const products: IProduct[] = await getProductsDB();
        const productFiltered = products.find((product) => product.id.toString() === id);
        if(!productFiltered) throw new Error("Product not found")
        return productFiltered;
    } catch (error: any) {
        throw new Error(error)
    }
};

export async function getProductsByCategory(categoryId: string): Promise<IProduct[]> {
    try {
        const products: IProduct[] = await getProductsDB();
        const productFiltered = products.filter((product) => product.categoryId.toString() === categoryId);
        if(!productFiltered.length) throw new Error("Product not found with the category")
        return productFiltered;
    } catch (error: any) {
        throw new Error(error)
    }
};