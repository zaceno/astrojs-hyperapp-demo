import "./button.css"
import { type ClassProp, type Action, type MaybeVNode } from "hyperapp"

type ButtonProps<S, P> = {
  class?: ClassProp
  onclick: Action<S, Event> | [Action<S, P>, P]
  style?: "wide" | "circle" | "borderless-circle" | "tiny"
  disabled?: boolean
}

export function Button<S, P>(
  props: ButtonProps<S, P>,
  content: MaybeVNode<S>[],
) {
  return (
    <button
      disabled={!!props.disabled}
      type="button"
      class={[
        {
          button: true,
          "button--small": props.style === "tiny",
          "button--borderless": props.style === "borderless-circle",
          "button--fill": props.style === "wide",
          "button--circle":
            props.style === "circle" || props.style === "borderless-circle",
        },
        props.class,
      ]}
      onclick={props.onclick}
    >
      {content}
    </button>
  )
}
