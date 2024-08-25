import { Metadata } from "next";

type Props = {
    params: {
        productId: string
    }
}

export const generateMetadata = async ({params}: Props): Promise<Metadata> => {
    const title = await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`iPhone ${params.productId}`);
        }, 100);
    });
    return {
        // title: `Product: ${params.productId}`
        title: `Product ${title}`
    }
}

export default function ProductDetail({
  params,
}: Props) {
  return <h1>Product Detail: {params.productId}</h1>;
}
