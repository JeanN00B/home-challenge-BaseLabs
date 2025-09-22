"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [tokenString, setTokenString] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setTokenString(token || "");
    const userRole = localStorage.getItem("role");
    setIsAdmin(userRole === "admin");

    if (!isAdmin) {
      router.push("/");
    }
  }, []);

  return <div>AdminPage</div>;
}
