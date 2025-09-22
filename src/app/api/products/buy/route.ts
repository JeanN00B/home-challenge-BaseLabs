import { buyProduct, buyWithLimit } from "@/server/products/products-functions";

export async function POST(request: Request) {
  const body = await request.json();
  const result = await buyWithLimit(body);
  // const result = await buyProduct(body);
  return new Response(JSON.stringify(result.response), {
    status: result.status,
  });
}
