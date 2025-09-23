// src/loaders/productLoader.js
export const productLoader = async ({ params }) => {
  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
  if (!res.ok) {
    throw new Response("Product not found", { status: 404 });
  }
  return res.json();
};
