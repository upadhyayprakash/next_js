import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Products"
}

const productIds = [1,2,3,100];

export default function ProductList() {
    return (<>
        <Link href="/">Go to Home</Link>
        <h1>Product List</h1>
        {
            productIds.map(id => <h2 key={id}><Link href={`/products/${id}`}>Product {id}</Link></h2>)
        }
    </>)
}