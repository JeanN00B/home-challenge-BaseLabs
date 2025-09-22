"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const handleLogin = async (formData: FormData) => {
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "").trim();

    if (!email || !password) {
      return;
    }

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error("Login failed. Please try again.");
    }

    const data = await res.json();
    localStorage.setItem("token", data.id);
    localStorage.setItem("role", data.role);
    router.push("/");
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Login</h2>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          await handleLogin(formData);
        }}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="client@gmail.com"
            className="w-full rounded-md border border-gray-300 p-2 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="••••••••"
            className="w-full rounded-md border border-gray-300 p-2 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-2 w-full rounded-md bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
