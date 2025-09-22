import prisma from "@/server/db";
import { RateLimiter } from "./rate-limiter";
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
  productName: string;
  productPrice: number;
}

export interface DeleteProductRequest {
  id: string;
}

export interface GetProductRequest {
  id: string;
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
  const { productId, ammount, clientId, productName, productPrice } = request;
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });
  if (!clientId) {
    throw new Error("Login to buy products!");
  }
  if (!product) {
    throw new Error("Product not found");
  }
  if (product.stock < ammount) {
    throw new Error("Not enough stock");
  }

  const stockUpdated = await prisma.product.update({
    where: { id: productId },
    data: { stock: { decrement: ammount } },
  });
  if (!stockUpdated) {
    throw new Error("Stock not updated");
  }

  const invoice = await prisma.invoice.create({
    data: {
      products: { productId, productName, productPrice, ammount },
      clientId,
    },
  });
  return { response: invoice, status: 200 };
}

export async function deleteProduct(request: DeleteProductRequest) {
  const { id } = request;
  const product = await prisma.product.delete({
    where: { id },
  });
  if (!product) {
    throw new Error("Product not found");
  }
  return { response: product, status: 200 };
}

// GetProducts FUNCTION
export async function getProducts() {
  const products = await prisma.product.findMany();
  return { response: products, status: 200 };
}

export async function getProductById(request: GetProductRequest) {
  const { id } = request;
  const product = await prisma.product.findUnique({
    where: { id },
  });
  if (!product) {
    throw new Error("Product not found");
  }
  return { response: product, status: 200 };
}

//TODO: add a decorator that applies a limit to the BUY endpoint (this is not working right now)
export const buyWithLimit = RateLimiter(buyProduct);
