"use client";

export default function AuthPage() {
  const handleLogin = async (formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    const result = fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    console.log(result);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form action={handleLogin} className="flex flex-col gap-4">
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
