export const prerender = false

export const getProductsForCategory = async category => {
  const products = await fetch(
    `https://fakestoreapi.com/products/category/${category}`,
  ).then(x => x.json())
  return products.map(product => ({
    ...product,
    image: "/api/images?i=" + encodeURIComponent(product.image),
  }))
}

export const GET = async ({ request }) => {
  const query = new URL(request.url).search
  const category = new URLSearchParams(query).get("category")
  console.log({ category })
  return new Response(JSON.stringify(await getProductsForCategory(category)))
}
