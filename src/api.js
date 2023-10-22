export const getCategories = async () =>
  await fetch("https://fakestoreapi.com/products/categories").then(x =>
    x.json(),
  )

export const getProductsForCategory = async category =>
  await fetch(`https://fakestoreapi.com/products/category/${category}`).then(
    x => x.json(),
  )
