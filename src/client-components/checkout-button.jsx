import island from "./island"

const ClearCart = state => ({ ...state, items: [], showing: false })

export default () =>
  island(state => (
    <button
      type="button"
      class="button--fill"
      onclick={state => [
        state,
        d => d(ClearCart),
        () => {
          window.location.href = "/confirmation"
        },
      ]}
    >
      Confirm order
    </button>
  ))
