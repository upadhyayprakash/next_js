"use client"
import { useRouter } from "next/navigation";
export default function OrderProduct()  {
    const router = useRouter();
    const handleClick = () => {
        console.log("placing your order...");
        router.push("/"); // navigate to home page
    }
    return (
        <>
            <h1>Order Product</h1>
            <button onClick={handleClick}>Place Order</button>
        </>
    )
}