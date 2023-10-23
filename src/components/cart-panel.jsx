import {
  shoppingIsland,
  AddToCart,
  RemoveFromCart,
  HideCart,
} from "../shopping"

const BeginCheckout = state => [
  HideCart(state),
  () =>
    queueMicrotask(() =>
      requestAnimationFrame(() => {
        window.location.href = "/checkout"
      }),
    ),
]

export default () =>
  shoppingIsland(state => (
    <div id="cart-panel" class={{ "cart-panel--visible": state.showing }}>
      <header>
        <h1>Shopping cart</h1>
        <button class="button--borderless button--circle" onclick={HideCart}>
          ╳
        </button>
      </header>
      <section>
        <table>
          <tbody>
            {state.items.map(item => (
              <tr>
                <td style={{ width: "4em" }}>
                  <img
                    src={"/imageproxy?&i=" + item.product.image}
                    class="img--fit"
                  />
                </td>
                <td>{item.product.title}</td>
                <td style={{ textAlign: "right", width: "3em" }}>
                  {"⤬ " + item.count}
                </td>
                <td style={{ width: "5em" }}>
                  <button
                    class="button--small"
                    onclick={[AddToCart, item.product]}
                  >
                    +
                  </button>
                  <button
                    class="button--small"
                    onclick={[RemoveFromCart, item.product]}
                  >
                    -
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <footer>
        <button onclick={BeginCheckout} class="button--fill" type="submit">
          To Checkout →
        </button>
      </footer>
    </div>
  ))
