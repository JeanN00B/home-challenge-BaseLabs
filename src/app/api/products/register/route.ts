import { registerProduct } from "@/server/products/products-functions";

export async function POST(request: Request) {
  const body = await request.json();
  const result = await registerProduct(body);
  return new Response(JSON.stringify(result.response), {
    status: result.status,
  });
}
