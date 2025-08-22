import { type Action, type Dispatch } from "hyperapp"
type Middleware<S> = (d: Dispatch<S>) => Dispatch<S>

type GetLocalStorageOpts<S, P> = {
  key: string
  callback: Action<S, P>
}

export function getLocalStorage<S, P>(
  dispatch: Dispatch<S>,
  opts: GetLocalStorageOpts<S, P>,
) {
  if (typeof localStorage === "undefined") return
  let data = localStorage.getItem(opts.key)
  if (!data) return
  dispatch([opts.callback, JSON.parse(data) as P])
}

type MWLocalStorageOpts<S> = {
  key: string
  getData: (s: S) => any
}

export function mwLocalStorage<S>(opts: MWLocalStorageOpts<S>): Middleware<S> {
  return dispatch => {
    if (typeof localStorage === "undefined") return dispatch
    let stackCount = 0
    return (action, payload) => {
      const state = Array.isArray(action) ? action[0] : action
      if (typeof state !== "function") {
        let myStackCount = ++stackCount
        queueMicrotask(() => {
          //only run if this was the last of these
          //microtasks scheduled in previous tick
          if (myStackCount !== stackCount) return
          stackCount = 0
          localStorage.setItem(
            opts.key,
            JSON.stringify(opts.getData(state as S)),
          )
        })
      }
      dispatch(action, payload)
    }
  }
}
