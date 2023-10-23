import islands from "@zxlabs/hyperapp-extra/islands"
import localStorageIO from "@zxlabs/hyperapp-extra/localstorage"
import { app } from "hyperapp"

const sync = islands()
const [initls, savels] = localStorageIO("shopping-cart")
app(
  sync({
    init: [
      { items: [], showing: false },
      initls((state, items) => ({ ...state, items })),
    ],
    subscriptions: state => [savels(state.items)],
  }),
)

export default view => sync({ view })
