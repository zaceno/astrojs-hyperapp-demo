import syncIslands from "@zxlabs/hyperapp-extra/islands"
import localStorageIO from "@zxlabs/hyperapp-extra/localstorage"
import { app } from "hyperapp"

export const AddToCart = (state, product) => {
  let items = [...state.items]
  let index = state.items.findIndex(item => item.id === product.id)
  if (index < 0) {
    items.push({ id: product.id, product, count: 1 })
  } else {
    items[index] = { ...items[index], count: items[index].count + 1 }
  }
  return { ...state, items }
}

export const RemoveFromCart = (state, product) => {
  let items = [...state.items]
  let index = state.items.findIndex(item => item.id === product.id)
  if (index < 0) return state
  let count = items[index].count - 1
  if (count < 1) items.splice(index, 1)
  else items[index] = { ...items[index], count }
  let news = { ...state, items }
  if (itemCount(news) === 0) {
    news = { ...news, showing: false }
  }
  return news
}

export const RevealCart = state => ({ ...state, showing: true })
export const HideCart = state => ({ ...state, showing: false })
export const ClearCart = state => ({ ...state, items: [], showing: false })

const LoadCartItems = (state, items) => ({ ...state, items })

export const totalCost = state =>
  Math.round(
    100 *
      state.items.reduce(
        (total, item) => total + item.count * item.product.price,
        0,
      ),
  ) / 100

export const itemCount = state =>
  state.items.reduce((total, item) => total + item.count, 0)

const [initls, savels] = localStorageIO("shopping-cart")
const sync = syncIslands()
app(
  sync({
    init: [{ items: [], showing: false }, initls(LoadCartItems)],
    subscriptions: state => [savels(state.items)],
  }),
)

export const shoppingIsland = view => sync({ view })
