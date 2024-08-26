import { notFound } from "next/navigation";

const getRandomInt = (count: number) => {
    return Math.floor(Math.random() * count);
}

export default function ReviewDetail({
  params,
}: {
  params: { reviewId: string; productId: string };
}) {
    const random = getRandomInt(2);
    if(random === 1)
        throw new Error("Error loading review");
    if(parseInt(params.reviewId) > 1000)
        notFound();
    return (
    <>
      <h1>Product Detail: {params.productId}</h1>
      <h1>Review Detail: {params.reviewId}</h1>
    </>
  );
}
