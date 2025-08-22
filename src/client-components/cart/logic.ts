import { getLocalStorage, mwLocalStorage } from "./localstorage"
import { type Product } from "@/data/products"
import { type Action } from "hyperapp"

type ID = Product["id"]
type CartItem = { id: ID; product: Product; count: number }
export type { Product }
export type State = {
  items: CartItem[]
  showing: boolean
}
type CartAction<P = any> = Action<State, P>

export const initialState: State = { items: [], showing: false }

// Puts a bunch of items in to the cart, from localStorage probably
export const LoadItems: CartAction<CartItem[]> = (state, items) => ({
  ...state,
  items,
})

// Set the cart as showing
export const Show: CartAction = state => ({ ...state, showing: true })

// Set the cart as hidden
export const Hide: CartAction = state => ({ ...state, showing: false })

// Action to decrement the number of products in the
// cart, for a given id. Will remove the product
// entirely if 0. Will hide the cart if total
// number of items is zero.
export const RemoveOne: CartAction<ID> = (state, id) => {
  const items = state.items
    .map(item => (item.id !== id ? item : { ...item, count: item.count - 1 }))
    .filter(item => item.count > 0)
  return { ...state, items, showing: !!items.length }
}

// Action to increment the number of products in the
// cart, for a given id. Item must be in the cart
// for this to work.
export const AddOne: CartAction<ID> = (state, id) => ({
  ...state,
  items: state.items.map(item =>
    item.id !== id ? item : { ...item, count: item.count + 1 },
  ),
})

// Add a new product to the cart. If the product already
// exists in the cart, the count will be incremented.
export const AddProduct: CartAction<Product> = (state, product) => {
  if (state.items.find(item => item.id === product.id))
    return [AddOne, product.id]
  return {
    ...state,
    items: [...state.items, { id: product.id, count: 1, product }],
  }
}

// Hide the cart and go to the checkout page
export const Checkout: CartAction = state => [
  { ...state, showing: false },
  () => {
    window.location.href = "/checkout"
  },
]

// "Confirm" the order: clears the cart
// and takes you to a confirmation page
export const Confirm: CartAction = state => [
  { ...state, items: [], showing: false },
  () => {
    window.location.href = "/confirmation"
  },
]

// Calculates total cost of items in cart
export const calcTotalCost = (state: State) =>
  Math.round(
    100 *
      state.items.reduce(
        (total, item) => total + item.count * item.product.price,
        0,
      ),
  ) / 100

// Calculates total number of items in cart
export const calcNumberOfItems = (state: State) =>
  state.items.reduce((total, item) => total + item.count, 0)
