import masterApp from "@zxlabs/astrojs-hyperapp/synced-islands"

// define a headless master application and a function
// for defining synced view-islands
export const cartIsland = masterApp({
  init: [
    // initial state
    { items: [], showing: false },

    // initial effect to load the stored
    // cart items from localstorage
    dispatch => {
      if (typeof localStorage === "undefined") return
      let data = localStorage.getItem("shopping-cart")
      if (!data) return
      dispatch(state => ({ ...state, items: JSON.parse(data) }))
    },
  ],

  // middleware to persist items in local storage
  // whenever they change
  dispatch: dispatch => {
    if (typeof localStorage === "undefined") return dispatch
    let items = null
    return (action, payload) => {
      const state = Array.isArray(action) ? action[0] : action
      if (typeof state !== "function") {
        items = state.items
        queueMicrotask(() => {
          if (items !== state.items) return
          localStorage.setItem("shopping-cart", JSON.stringify(items))
        })
      }
      dispatch(action, payload)
    }
  },
})

// Set the cart as showing
export const Show = state => ({ ...state, showing: true })

// Set the cart as hidden
export const Hide = state => ({ ...state, showing: false })

// Action to decrement the number of products in the
// cart, for a given id. Will remove the product
// entirely if 0. Will hide the cart if total
// number of items is zero.
export const RemoveOne = (state, id) => {
  const items = state.items
    .map(item => (item.id !== id ? item : { ...item, count: item.count - 1 }))
    .filter(item => item.count > 0)
  return { ...state, items, showing: !!items.length }
}

// Action to increment the number of products in the
// cart, for a given id. Item must be in the cart
// for this to work.
export const AddOne = (state, id) => ({
  items: state.items.map(item =>
    item.id !== id ? item : { ...item, count: item.count + 1 },
  ),
})

// Add a new product to the cart. If the product already
// exists in the cart, the count will be incremented.
export const AddProduct = (state, product) => {
  if (state.items.find(item => item.id === product.id))
    return [AddOne, product.id]
  return {
    ...state,
    items: [...state.items, { id: product.id, count: 1, product }],
  }
}

// Hide the cart and go to the checkout page
export const Checkout = state => [
  { ...state, showing: false },
  () => (window.location.href = "/checkout"),
]

// "Confirm" the order: clears the cart
// and takes you to a confirmation page
export const Confirm = state => [
  { ...state, items: [], showing: false },
  () => (window.location.href = "/confirmation"),
]

// Calculates total cost of items in cart
export const calcTotalCost = state =>
  Math.round(
    100 *
      state.items.reduce(
        (total, item) => total + item.count * item.product.price,
        0,
      ),
  ) / 100

// Calculates total number of items in cart
export const calcNumberOfItems = state =>
  state.items.reduce((total, item) => total + item.count, 0)
