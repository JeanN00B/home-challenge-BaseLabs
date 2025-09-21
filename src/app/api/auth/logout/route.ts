import { logout } from "@/server/auth/auth-functions";

export async function POST(request: Request) {
  const body = await request.json();
  const { message, status } = await logout(body);
  localStorage.removeItem("token");
  return new Response(JSON.stringify({ message }), {
    status,
  });
}
