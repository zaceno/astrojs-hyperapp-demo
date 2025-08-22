import products from "./products.json"

export type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export async function getCategories() {
  const categories = new Set<string>()
  products.forEach(product => {
    categories.add(product.category as string)
  })
  return [...categories]
}

export async function getCategoryProducts(category: string) {
  return (products as Product[]).filter(
    product => product.category === category,
  )
}
