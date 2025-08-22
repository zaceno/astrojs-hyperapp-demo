import cartSynchronizer from "./cart/synchronizer"
import { AddProduct, type Product } from "./cart/logic"
import { Button } from "./button/button"
import { type ClassProp } from "hyperapp"

type ServerProps = {
  product: Product
  class?: ClassProp
}

export default (props: ServerProps) =>
  cartSynchronizer(_ => (
    <Button
      style="circle"
      class={props.class}
      onclick={[AddProduct, props.product]}
    >
      +
    </Button>
  ))
