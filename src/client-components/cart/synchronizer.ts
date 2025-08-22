import makeSynchronizer from "astrojs-hyperapp/synced-islands"
import { mwLocalStorage, getLocalStorage } from "./localstorage"
import { type State, initialState, LoadItems } from "./logic"

const LS_CART_KEY = "shopping-cart"

const synchronizer = makeSynchronizer<State>({
  init: [
    initialState,
    [getLocalStorage, { key: LS_CART_KEY, callback: LoadItems }],
  ],
  dispatch: mwLocalStorage({
    key: LS_CART_KEY,
    getData: (state: State) => state.items,
  }),
})

export default synchronizer
