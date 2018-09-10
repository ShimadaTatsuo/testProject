import React from 'react'
import xs from 'xstream'
import { componentFromStream, setObservableConfig, createEventHandler } from 'recompose'

import xstreamConfig from 'recompose/xstreamObservableConfig'
setObservableConfig(xstreamConfig)

const { handler: increment, stream: increment$ } = createEventHandler()
const { handler: decrement, stream: decrement$ } = createEventHandler()

const intent = souces$ => {
  const stream$ = xs.merge(increment$.mapTo(1), decrement$.mapTo(-1))
  return stream$
}

const model = intent$ => {
  const count$ = intent$.fold((count, n) => count + n, 0)
  return count$
}

const view = model$ => {
  const vdom$ = model$.map(count => (
    <div>
      Count: {count}
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  ))
  return vdom$
}

export default componentFromStream(props$ => {
  const intent$ = intent(props$)
  const model$ = model(intent$)
  const view$ = view(model$)
  return view$
})
