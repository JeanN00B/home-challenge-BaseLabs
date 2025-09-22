"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import RegisterProduct from "@/app/components/admin-dashboard/register-product";
import AdminProduct from "@/app/components/admin-dashboard/admin-product";

export default function Main() {
  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token") || "";
    const role = localStorage.getItem("role");
    const computedIsAdmin = role === "admin";

    setToken(storedToken);
    setIsAdmin(computedIsAdmin);

    console.log("role", role);
    console.log("isAdmin (computed)", computedIsAdmin);
    console.log("token", storedToken);

    if (!computedIsAdmin) {
      router.push("/");
    }
  }, []);

  return (
    <div className="flex flex-row gap-4 w-full min-h-[70vh]">
      <div className="flex flex-col gap-4 w-1/2 h-full">
        <RegisterProduct />
      </div>
      <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm w-1/2">
        <h2 className="text-xl font-semibold">Current Products</h2>
        <div className="w-full max-h-[70vh] overflow-y-auto scrollbar">
          <AdminProduct />
        </div>
      </div>
    </div>
  );
}
