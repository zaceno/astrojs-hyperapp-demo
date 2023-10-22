import { shoppingIsland, AddToCart } from "../shopping"

export default ({ product }) =>
  shoppingIsland(_ => (
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
