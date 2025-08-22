import { Button } from "./button/button"
import cartSynchronizer from "./cart/synchronizer"
import { Hide, AddOne, RemoveOne, Checkout } from "./cart/logic"

export default () =>
  cartSynchronizer(state => (
    <div id="cart-panel" class={{ "cart-panel--visible": state.showing }}>
      <header>
        <h1>Shopping cart</h1>
        <Button style="borderless-circle" onclick={Hide}>
          ╳
        </Button>
      </header>
      <section>
        <table>
          <tbody>
            {state.items.map(item => (
              <tr>
                <td style={{ width: "4em" }}>
                  <img src={item.product.image} class="img--fit" />
                </td>
                <td>{item.product.title}</td>
                <td style={{ textAlign: "right", width: "3em" }}>
                  {"⤬ " + item.count}
                </td>
                <td style={{ width: "5em" }}>
                  <Button style="tiny" onclick={[AddOne, item.id]}>
                    +
                  </Button>
                  <Button style="tiny" onclick={[RemoveOne, item.id]}>
                    -
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <footer>
        <Button onclick={Checkout} style="wide" type="submit">
          To Checkout →
        </Button>
      </footer>
    </div>
  ))
