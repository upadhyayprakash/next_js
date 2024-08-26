import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Products"
}

export default function ProductList() {
    return (<>
        <h1>Product List</h1>
        <h2>Product 1</h2>
        <h2>Product 2</h2>
        <h2>Product 3</h2>
    </>)
}