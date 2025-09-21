import { getProducts } from "@/server/products/products-functions";

export async function GET() {
  const { response, status } = await getProducts();
  return new Response(JSON.stringify(response), { status });
}
