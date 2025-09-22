import { getInvoices } from "../invoice/invoice-function";
import { BuyProductRequest, getProductById } from "./products-functions";

export function RateLimiter<T extends BuyProductRequest>(
  callback: (request: T) => Promise<any>
) {
  return async (request: T) => {
    const { productId, clientId } = request;

    // We search for the product information
    const obtainedProduct = await getProductById({ id: productId });
    const { ammountLimit, timeRangeLimit } = obtainedProduct.response;

    // We search for the client invoices on the last timeRangeLimit(minutes)
    if (timeRangeLimit > 0) {
      let itemsPerTimeRange = 0;
      const { response, status } = await getInvoices({
        token: clientId,
        timeRangeLimit: timeRangeLimit,
        productId: productId,
      });

      if (status !== 200) {
        return { response: "Internal server error", status: 500 };
      }

      for (const invoice of response) {
        if (invoice.products) {
          const invoiceDetails = invoice.products as {
            productId: string;
            ammount: number;
          };
          if (invoiceDetails.productId === productId) {
            itemsPerTimeRange += invoiceDetails.ammount;
          }
        }
      }
      if (itemsPerTimeRange >= ammountLimit) {
        return { response: "Too many requests", status: 429 };
      }
    }
    // If we get here, we can proceed with the request
    return callback(request);
  };
}
