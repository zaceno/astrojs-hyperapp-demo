import "./order-list.css"
import cartSynchronizer from "@/client-components/cart/synchronizer"
import { calcTotalCost } from "@/client-components/cart/logic"

export default () =>
  cartSynchronizer(state => (
    <table class="order-list">
      <thead>
        <tr>
          <th class="w2"></th>
          <th class="tl">Item</th>
          <th class="w6">Unit price</th>
          <th class="w4"></th>
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
            <td class="tr">${item.product.price}</td>
            <td>⤬{item.count}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th class="tr" colspan="2">
            Total:
          </th>
          <td class="tr">${calcTotalCost(state)}</td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  ))
