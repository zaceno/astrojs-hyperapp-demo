import island from "./island"
const RevealCart = state => ({ ...state, showing: true })

const itemCount = state =>
  state.items.reduce((total, item) => total + item.count, 0)

export default props =>
  island(state => {
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
