"use client";

import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const handleLogin = async (formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    localStorage.setItem("token", data.id);
    localStorage.setItem("role", data.role);
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          await handleLogin(formData);
        }}
        className="flex flex-col gap-4"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border border-gray-300 rounded-md p-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border border-gray-300 rounded-md p-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Login
        </button>
      </form>
    </div>
  );
}
