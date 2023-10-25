import { cartIsland, calcNumberOfItems, Show } from "./cart"
export default props =>
  cartIsland(state => {
    const n = calcNumberOfItems(state)
    return (
      <button
        class={[props.className, "cart-status"]}
        disabled={!n}
        onclick={Show}
      >
        🛒
        {n > 0 ? n : ""}
      </button>
    )
  })
