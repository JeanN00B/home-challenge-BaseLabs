import prisma from "@/server/db";

interface GetInvoicesRequest {
  clientId: string;
}

export async function getInvoices(request: GetInvoicesRequest) {
  const { clientId } = request;
  const invoices = await prisma.invoice.findMany({
    where: { clientId: clientId },
  });
  console.log("invoices", invoices);
  console.log("clientId", clientId);
  return { response: invoices, status: 200 };
}
