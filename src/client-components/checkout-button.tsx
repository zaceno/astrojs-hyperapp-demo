import cartSynchronizer from "./cart/synchronizer"
import { Confirm } from "./cart/logic"
import { Button } from "./button/button"
export default () =>
  cartSynchronizer(_ => (
    <Button style="wide" onclick={Confirm}>
      Confirm order
    </Button>
  ))
