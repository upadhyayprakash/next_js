import { notFound } from "next/navigation";

export default function ReviewDetail({
  params,
}: {
  params: { reviewId: string; productId: string };
}) {
    if(parseInt(params.reviewId) > 1000)
        notFound();
    return (
    <>
      <h1>Product Detail: {params.productId}</h1>
      <h1>Review Detail: {params.reviewId}</h1>
    </>
  );
}
