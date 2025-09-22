"use client";

import { Product } from "@/generated/prisma";
import Button from "@mui/material/Button";
export default function UpdateProduct(product: Partial<Product>) {
  async function handleUpdateProduct(
    update: Partial<Product> & { id: string }
  ) {
    await fetch("/api/products/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(update),
    });
  }

  async function handleDeleteProduct(id: string) {
    await fetch("/api/products/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  }

  function handleEditForm() {
    return (
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget as HTMLFormElement;
          const formData = new FormData(form);

          const id = String(formData.get("id") || "").trim();
          const name = String(formData.get("name") || "").trim();
          const description = String(formData.get("description") || "").trim();
          const imageUrl = String(formData.get("imageUrl") || "").trim();
          const priceStr = String(formData.get("price") || "").trim();
          const stockStr = String(formData.get("stock") || "").trim();
          const ammountLimitStr = String(
            formData.get("ammountLimit") || ""
          ).trim();
          const timeRangeLimitStr = String(
            formData.get("timeRangeLimit") || ""
          ).trim();

          const updatePayload: Partial<Product> & { id: string } = { id };
          if (name) updatePayload.name = name as any;
          if (description) updatePayload.description = description as any;
          if (imageUrl) updatePayload.imageUrl = imageUrl as any;
          if (priceStr) updatePayload.price = Number(priceStr) as any;
          if (stockStr) updatePayload.stock = Number(stockStr) as any;
          if (ammountLimitStr)
            updatePayload.ammountLimit = Number(ammountLimitStr) as any;
          if (timeRangeLimitStr)
            updatePayload.timeRangeLimit = Number(timeRangeLimitStr) as any;

          await handleUpdateProduct(updatePayload);
        }}
        className="relative flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        {/* Top-right delete button */}
        <button
          type="button"
          aria-label="Delete product"
          className="absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-md border border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
          onClick={() => product.id && handleDeleteProduct(product.id)}
          title="Delete product"
        >
          X
        </button>

        {/* Row 1: ID (read-only) */}
        <div className="flex flex-col gap-1 sm:max-w-md">
          <label htmlFor="id" className="text-sm font-medium text-gray-700">
            ID
          </label>
          <input
            id="id"
            name="id"
            type="text"
            defaultValue={product.id}
            className="w-full rounded-md border border-gray-300 bg-gray-100 p-2 text-gray-500"
            readOnly
          />
        </div>

        {/* Row 2: Name, Description, Image URL */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Product name"
              defaultValue={product.name || ""}
              className="w-full rounded-md border border-gray-300 p-2 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Short description"
              defaultValue={product.description || ""}
              className="w-full rounded-md border border-gray-300 p-2 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              rows={3}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="imageUrl"
              className="text-sm font-medium text-gray-700"
            >
              Image URL
            </label>
            <input
              id="imageUrl"
              name="imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              defaultValue={product.imageUrl || ""}
              className="w-full rounded-md border border-gray-300 p-2 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
            />
          </div>
        </div>

        {/* Row 3: Price, Stock, Max items, Per X minutes, Update button (right) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="price"
              className="text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              placeholder="e.g., 100"
              defaultValue={product.price as any}
              className="w-full rounded-md border border-gray-300 p-2 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
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
              name="stock"
              type="number"
              placeholder="e.g., 50"
              defaultValue={product.stock as any}
              className="w-full rounded-md border border-gray-300 p-2 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              min={0}
              step={1}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="ammountLimit"
              className="text-sm font-medium text-gray-700"
            >
              Max items
            </label>
            <input
              id="ammountLimit"
              name="ammountLimit"
              type="number"
              placeholder="e.g., 3"
              defaultValue={product.ammountLimit as any}
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
              Per X minutes
            </label>
            <input
              id="timeRangeLimit"
              name="timeRangeLimit"
              type="number"
              placeholder="e.g., 60"
              defaultValue={product.timeRangeLimit as any}
              className="w-full rounded-md border border-gray-300 p-2 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              min={1}
              step={1}
            />
          </div>

          <div className="flex items-end justify-end">
            <Button
              size="small"
              type="submit"
              variant="contained"
              color="warning"
            >
              Update Product
            </Button>
          </div>
        </div>
      </form>
    );
  }

  return <div>{handleEditForm()}</div>;
}
