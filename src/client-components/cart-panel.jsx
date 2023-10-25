import { cartIsland, Hide, AddOne, RemoveOne, Checkout } from "./cart"
export default () =>
  cartIsland(state => (
    <div id="cart-panel" class={{ "cart-panel--visible": state.showing }}>
      <header>
        <h1>Shopping cart</h1>
        <button class="button--borderless button--circle" onclick={Hide}>
          ╳
        </button>
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
                  <button class="button--small" onclick={[AddOne, item.id]}>
                    +
                  </button>
                  <button class="button--small" onclick={[RemoveOne, item.id]}>
                    -
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <footer>
        <button onclick={Checkout} class="button--fill" type="submit">
          To Checkout →
        </button>
      </footer>
    </div>
  ))
