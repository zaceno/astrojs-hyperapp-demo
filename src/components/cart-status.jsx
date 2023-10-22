import { shoppingIsland, itemCount, RevealCart } from "../shopping"

export default props =>
  shoppingIsland(state => {
    const n = itemCount(state)
    return (
      <button
        class={[props.className, "cart-status"]}
        disabled={!n}
        onclick={RevealCart}
      >
        🛒
        {n > 0 ? n : ""}
      </button>
    )
  })
