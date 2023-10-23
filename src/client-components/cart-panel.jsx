import island from "./island"

const AddOne = (state, id) => ({
  ...state,
  items: state.items.map(item =>
    item.id !== id ? item : { ...item, count: item.count + 1 },
  ),
})

const RemoveOne = (state, id) => {
  const items = state.items
    .map(item => (item.id !== id ? item : { ...item, count: item.count - 1 }))
    .filter(item => item.count > 0)
  return { ...state, items, showing: !!items.length }
}

const HideCart = state => ({ ...state, showing: false })

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
  island(state => (
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
        <button onclick={BeginCheckout} class="button--fill" type="submit">
          To Checkout →
        </button>
      </footer>
    </div>
  ))
