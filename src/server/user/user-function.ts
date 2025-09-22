import prisma from "@/server/db";

interface GetInvoicesRequest {
  token: string;
}

export async function getInvoices(request: GetInvoicesRequest) {
  const { token } = request;
  const invoices = await prisma.invoice.findMany({
    where: { clientId: token },
  });

  return { response: invoices, status: 200 };
}
