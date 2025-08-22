import cartSynchronizer from "./cart/synchronizer"
import { calcNumberOfItems, Show } from "./cart/logic"
import { type ClassProp } from "hyperapp"
import { Button } from "./button/button"

type ServerProps = {
  className: ClassProp
}
export default ({ className }: ServerProps) =>
  cartSynchronizer(state => {
    const n = calcNumberOfItems(state)
    return (
      <Button class={[className, "cart-status"]} disabled={!n} onclick={Show}>
        🛒
        {n > 0 ? n : ""}
      </Button>
    )
  })
