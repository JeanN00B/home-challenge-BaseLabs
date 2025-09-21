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
      <div className="w-2/3 h-full border-2 border-gray-300 rounded-lg p-4">
        <DisplayStoreItems />
      </div>
      <div className="w-1/3 h-full bg-gray-100 rounded-lg p-4 justify-center items-center flex">
        <DisplayUserInvoices token={tokenString} />
      </div>
    </div>
  );
}
