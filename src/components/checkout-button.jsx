import { shoppingIsland, ClearCart } from "../shopping"
export default () =>
  shoppingIsland(state => (
    <button
      type="button"
      class="button--fill"
      onclick={state => [
        state,
        d => d(ClearCart),
        () => {
          window.location.href = "/confirmation"
        },
      ]}
    >
      Confirm order
    </button>
  ))
