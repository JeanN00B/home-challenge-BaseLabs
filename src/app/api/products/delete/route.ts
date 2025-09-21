import { deleteProduct } from "@/server/products/products-functions";

export async function DELETE(request: Request) {
  const body = await request.json();
  const { response, status } = await deleteProduct(body);
  return new Response(JSON.stringify(response), {
    status,
  });
}
