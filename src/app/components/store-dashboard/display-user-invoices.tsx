import { Invoice } from "@/generated/prisma";
import { getInvoices } from "@/server/user/user-function";
import { useEffect, useState } from "react";
import BasicTable from "../ui/Table";

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
    <>
      {/* {invoices.map((invoice: Invoice) => {})} */}
      <BasicTable />
    </>
  );
}
