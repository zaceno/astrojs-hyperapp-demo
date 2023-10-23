import island from "./island"

const totalCost = state =>
  Math.round(
    100 *
      state.items.reduce(
        (total, item) => total + item.count * item.product.price,
        0,
      ),
  ) / 100

export default () =>
  island(state => (
    <table class="order-list">
      <thead>
        <tr>
          <th style={{ width: "2rem" }}></th>
          <th style={{ textAlign: "left" }}>Item</th>
          <th style={{ width: "6rem" }}>Unit price</th>
          <th style={{ width: "4rem" }}></th>
        </tr>
      </thead>
      <tbody>
        {state.items.map(item => (
          <tr>
            <td>
              <img
                class="img--fit"
                src={item.product.image}
                alt={item.product.title}
              />
            </td>
            <td>{item.product.title}</td>
            <td style={{ textAlign: "right" }}>${item.product.price}</td>
            <td>⤬{item.count}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th style={{ textAlign: "right" }} colspan="2">
            Total:
          </th>
          <td style={{ textAlign: "right" }}>${totalCost(state)}</td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  ))
