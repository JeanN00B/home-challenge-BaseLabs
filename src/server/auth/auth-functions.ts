import prisma from "@/server/db";
// TODO: save and read hashed password in the database

// Interfaces
export interface RegisterRequest {
  email: string;
  name?: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LogoutRequest {
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

  if (userResponse == null) {
    throw new Error("user or password incorrect");
  }
  // TODO: add a session token to the client --> token must be cyphered and decyphered with user password
  return { response: userResponse, status: 200 };
}

// Logout FUNCTION
export async function logout(request: LogoutRequest) {
  const { token } = request;
  // TODO: remove the token from the client
  return { message: "Logout successful", status: 200 };
}
