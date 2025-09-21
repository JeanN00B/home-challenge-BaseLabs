import { updateProduct } from "@/server/products/products-functions";

export async function PATCH(request: Request) {
  const body = await request.json();
  const result = await updateProduct(body);
  return new Response(JSON.stringify(result.response), {
    status: result.status,
  });
}
