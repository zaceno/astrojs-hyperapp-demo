import { cartIsland, Confirm } from "./cart"

export default () =>
  cartIsland(_ => (
    <button type="button" class="button--fill" onclick={Confirm}>
      Confirm order
    </button>
  ))
