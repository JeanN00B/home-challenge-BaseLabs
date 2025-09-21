"use server";

import { login } from "@/server/auth/auth-functions";

export async function POST(request: Request) {
  const body = await request.json();
  const { response, status } = await login(body);
  if (status !== 200) {
    return new Response(JSON.stringify({ message: "Invalid credentials" }), {
      status: 401,
    });
  } else {
    return new Response(JSON.stringify(response), {
      status,
    });
  }
}
