import prisma from "@/server/db";
// TODO: save and read hashed password in the database

// Interfaces
interface RegisterRequest {
  email: string;
  name?: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LogoutRequest {
  token: string;
}

// Register FUNCTION
export async function register(request: RegisterRequest) {
  const { email, name, password } = request;
  const userResponse = await prisma.user.create({
    data: {
      email: email,
      name: name,
      password: password,
      role: "client",
    },
  });

  return userResponse;
}

// Login FUNCTION
export async function login(request: LoginRequest) {
  const { email, password } = request;
  const userResponse = await prisma.user.findUnique({
    where: { email: email, password: password },
  });

  if (!userResponse) {
    return { error: "user or password incorrect" };
  }

  // TODO: add a session token to the client --> token must be cyphered and decyphered with user password
  return userResponse;
}

// Logout FUNCTION
export async function logout(request: LogoutRequest) {
  const { token } = request;
  // TODO: remove the token from the client
  return { message: "Logout successful" };
}
