import { Invoice } from "@/generated/prisma";
import { useEffect, useState } from "react";

interface DisplayUserInvoicesProps {
  token: string;
}

export default function DisplayUserInvoices({
  token,
}: DisplayUserInvoicesProps) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    const run = async () => {
      const invoicesList = await fetch("/api/invoices/get", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await invoicesList.json();
      setInvoices(data);
    };
    run();
  }, []);

  if (invoices.length === 0) {
    return (
      <div className="text-center text-gray-400 text-lg p-5">
        No invoices found, please authenticate or buy something first.
      </div>
    );
  }

  return (
    <ul>
      {invoices.map((invoice: Invoice) => {
        return (
          <li
            className="border-y-2 border-gray-300 p-2 text-white"
            key={invoice.id}
          >
            <h3>
              Invoice ID:
              <span className="text-green-500 ml-2">{invoice.id}</span>
            </h3>
            <ul>
              {invoice.products &&
                Object.entries(invoice.products).map(
                  ([k, v]) =>
                    k != "productId" && (
                      <li key={k}>
                        <strong>{k}:</strong> {String(v)}
                      </li>
                    )
                )}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}
