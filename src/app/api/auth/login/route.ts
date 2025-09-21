import { login } from "@/server/auth/auth-functions";

export async function POST(request: Request) {
  const body = await request.json();
  const result = await login(body);
  return new Response(JSON.stringify(result), { status: 200 });
}
