"use client";

import { Product } from "@/generated/prisma";

export default function RegisterProduct(product: Partial<Product>) {
  const handleRegisterProduct = async (
    formData: FormData,
    formEl: HTMLFormElement
  ) => {
    const name = String(formData.get("name") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const priceStr = String(formData.get("price") || "").trim();
    const stockStr = String(formData.get("stock") || "").trim();
    const ammountLimitStr = String(formData.get("ammountLimit") || "").trim();
    const timeRangeLimitStr = String(
      formData.get("timeRangeLimit") || ""
    ).trim();
    const imageUrl = String(formData.get("imageUrl") || "").trim();
    const price = Number(priceStr);
    const stock = Number(stockStr);
    const ammountLimit = ammountLimitStr ? Number(ammountLimitStr) : undefined;
    const timeRangeLimit = timeRangeLimitStr
      ? Number(timeRangeLimitStr)
      : undefined;

    const res = await fetch("/api/products/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description: description || undefined,
        price,
        imageUrl: imageUrl || undefined,
        stock,
        ammountLimit,
        timeRangeLimit,
      }),
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(errorBody?.message || "Product registration failed.");
    }

    formEl.reset();
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Register Product</h2>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          await handleRegisterProduct(formData, e.currentTarget);
        }}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="e.g., Fresh Corn"
            className="w-full rounded-md border border-gray-300 p-2 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-700"
          >
            Description (optional)
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Short description"
            className="w-full rounded-md border border-gray-300 p-2 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
            rows={3}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="imageUrl"
            className="text-sm font-medium text-gray-700"
          >
            Image URL (optional)
          </label>
          <input
            id="imageUrl"
            type="string"
            name="imageUrl"
            placeholder="e.g., https://example.com/image.jpg"
            className="w-full rounded-md border border-gray-300 p-2 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="price"
              className="text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              id="price"
              type="number"
              name="price"
              placeholder="e.g., 100"
              className="w-full rounded-md border border-gray-300 p-2 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              required
              min={1}
              step={1}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="stock"
              className="text-sm font-medium text-gray-700"
            >
              Stock
            </label>
            <input
              id="stock"
              type="number"
              name="stock"
              placeholder="e.g., 50"
              className="w-full rounded-md border border-gray-300 p-2 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              required
              min={0}
              step={1}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="ammountLimit"
              className="text-sm font-medium text-gray-700"
            >
              Max items (optional)
            </label>
            <input
              id="ammountLimit"
              type="number"
              name="ammountLimit"
              placeholder="e.g., 3"
              className="w-full rounded-md border border-gray-300 p-2 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              min={0}
              step={1}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="timeRangeLimit"
              className="text-sm font-medium text-gray-700"
            >
              Per X minutes (optional)
            </label>
            <input
              id="timeRangeLimit"
              type="number"
              name="timeRangeLimit"
              placeholder="e.g., 60"
              className="w-full rounded-md border border-gray-300 p-2 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              min={1}
              step={1}
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 w-full rounded-md bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          Register Product
        </button>
      </form>
    </div>
  );
}
