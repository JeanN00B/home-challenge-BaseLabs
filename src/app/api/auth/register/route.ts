import { register } from "@/server/auth/auth-functions";

export async function POST(request: Request) {
  const body = await request.json();
  const { response, status } = await register(body);
  if (status !== 200) {
    return new Response(
      JSON.stringify({ message: "User not created, email already in use" }),
      {
        status: 400,
      }
    );
  } else {
    return new Response(JSON.stringify(response), {
      status,
    });
  }
}
