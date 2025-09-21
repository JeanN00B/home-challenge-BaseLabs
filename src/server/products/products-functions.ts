import prisma from "@/server/db";
import { RateLimiter, RateLimiterProps } from "./rate-limiter";
// UPDATE PRODUCT FUNCTION

// BUY PRODUCT FUNCTION

// Interfaces
export interface RegisterProductRequest {
  name: string;
  description?: string;
  price: number;
  stock?: number;
  ammountLimit?: number;
  timeRangeLimit?: number;
}

export interface UpdateProductRequest {
  id: string; // We need to identify the product, what we change is all optional
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  ammountLimit?: number;
  timeRangeLimit?: number;
}

export interface BuyProductRequest {
  productId: string;
  ammount: number;
  clientId: string;
}

// RegisterProduct FUNCTION
export async function registerProduct(request: RegisterProductRequest) {
  const { name, description, price, stock, ammountLimit, timeRangeLimit } =
    request;
  const product = await prisma.product.create({
    data: { name, description, price, stock, ammountLimit, timeRangeLimit },
  });
  if (!product) {
    throw new Error("Product not created");
  }
  return { response: product, status: 200 };
}

// UpdateProduct FUNCTION
export async function updateProduct(request: UpdateProductRequest) {
  const product = await prisma.product.update({
    where: { id: request.id },
    data: { ...request },
  });
  if (!product) {
    throw new Error("Product not found");
  }
  return { response: product, status: 200 };
}

// BuyProduct FUNCTION

export async function buyProduct(request: BuyProductRequest) {
  const { productId, ammount, clientId } = request;
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });
  if (!product) {
    throw new Error("Product not found");
  }
  if (product.stock < ammount) {
    throw new Error("Not enough stock");
  }

  const invoice = await prisma.invoice.create({
    data: {
      products: { create: { productId, ammount } },
      clientId,
    },
  });
  return { response: invoice, status: 200 };
}

//TODO: add a decorator that applies a limit to the BUY endpoint (this is not working right now)
export const BuyWithLimit = RateLimiter(buyProduct);
