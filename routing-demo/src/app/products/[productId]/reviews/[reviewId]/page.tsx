export default function ReviewDetail({
  params,
}: {
  params: { reviewId: string; productId: string };
}) {
  return (
    <>
      <h1>Product Detail: {params.productId}</h1>
      <h1>Review Detail: {params.reviewId}</h1>
    </>
  );
}
