export const prerender = false

export const getCategories = () =>
  fetch("https://fakestoreapi.com/products/categories").then(x => x.json())

export const GET = async () =>
  new Response(JSON.stringify(await getCategories()))
