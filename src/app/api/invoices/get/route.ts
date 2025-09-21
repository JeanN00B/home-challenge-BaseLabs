import { getInvoices } from "@/server/user/user-function";

export async function POST(request: Request) {
  const { clientId } = await request.json();
  const result = await getInvoices({ clientId: clientId });
  return new Response(JSON.stringify(result.response), {
    status: result.status,
  });
}
