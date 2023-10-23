import island from "./island"

const AddToCart = (state, product) => {
  let items = [...state.items]
  let index = state.items.findIndex(item => item.id === product.id)
  if (index < 0) {
    items.push({ id: product.id, product, count: 1 })
  } else {
    items[index] = { ...items[index], count: items[index].count + 1 }
  }
  return { ...state, items }
}

export default ({ product }) =>
  island(_ => (
    <div class="product-card">
      <div class="product-card__image">
        <img class="img--fit" src={product.image} alt={product.title} />
      </div>
      <p class="product-card__title">{product.title}</p>
      <p class="product-card__price">
        <b>${product.price}</b>
      </p>
      <button
        class="product-card__add-button button--circle"
        onclick={[AddToCart, product]}
      >
        +
      </button>
    </div>
  ))
