import prisma from "@/server/db";

interface GetInvoicesRequest {
  token: string;
  timeRangeLimit?: number;
  productId?: string;
}

export async function getInvoices(request: GetInvoicesRequest) {
  const { token, timeRangeLimit, productId } = request;
  const timeRange = timeRangeLimit
    ? {
        gte: new Date(Date.now() - timeRangeLimit * 60000),
        lte: new Date(),
      }
    : undefined;

  if (!productId) {
    const invoices = await prisma.invoice.findMany({
      where: {
        clientId: token,
        date: timeRange,
      },
    });
    return { response: invoices, status: 200 };
  } else {
    const invoices = await prisma.invoice.findMany({
      where: {
        clientId: token,
        date: timeRange,
        products: {
          path: "productId",
          equals: productId,
        },
      },
    });
    return { response: invoices, status: 200 };
  }
}
