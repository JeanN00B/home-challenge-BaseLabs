"use client";

import { useEffect, useState } from "react";
import DisplayStoreItems from "./display-store-items";
import DisplayUserInvoices from "./display-user-invoices";

export default function MainStoreDashboard() {
  const [tokenString, setTokenString] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenString = token || "";
    setTokenString(tokenString);
  }, []);

  return (
    <div className="flex flex-row gap-4 items-center justify-center w-full h-full">
      <div className="w-2/3 h-full border-2 border-gray-300 rounded-lg p-4 bg-[#191c25]">
        <DisplayStoreItems />
      </div>
      <div className="w-1/3 h-full rounded-lg p-4 justify-center items-center flex flex-col border-2 border-gray-300 bg-[#191c25] gap-4">
        <h2 className="text-white text-2xl font-bold">Invoices</h2>
        <div className="w-full h-full overflow-y-auto">
          <DisplayUserInvoices token={tokenString} />
        </div>
      </div>
    </div>
  );
}
