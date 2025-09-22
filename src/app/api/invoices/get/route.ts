import { getInvoices } from "@/server/invoice/invoice-function";

export async function POST(request: Request) {
  const body = await request.json();
  const result = await getInvoices(body);
  return new Response(JSON.stringify(result.response), {
    status: result.status,
  });
}
