import React from 'react'
import { createEventHandler, componentFromStream } from 'recompose'
import cs from './observable'

const { handler: increment, stream: increment$ } = createEventHandler()
const { handler: decrement, stream: decrement$ } = createEventHandler()


const intent = () => {
  const stream$ = cs()
  const increments = cs(increment$.subscribe).mapTo(1)
  const decrements = cs(decrement$.subscribe).mapTo(-1)
  return stream$.merge(increments, decrements)
}

const model = intent$ => {
  return intent$.scan((acc, one) => acc + one, 0)
}

const view = (props$, model$) => {
  return cs(props$.subscribe)
    .combine(model$, (count) => {
      return (
        <div>
          {count}
          <div onClick={increment}>aaa</div>
          <div onClick={decrement}>bbb</div>
        </div>
      )
    })
}

const App = componentFromStream(props$ => {
  const intent$ = intent()
  const model$ = model(intent$)
  const view$ = view(props$, model$)
  return view$
})

/*
const App = componentFromStream(props$ => {
  return new Observable(observer => {
    const wrapObserver = {
      next: x => {
        x = typeof x === 'object' && !Object.keys(x).length ? [] : x
        observer.next(vdom(x))
      },
    }
    new Observable(increment$.subscribe)
      .mapTo(1)
      .scan((acc, one) => acc + one, 0)
      .subscribe(wrapObserver)
    return props$.subscribe(wrapObserver)
  })
})
*/


/*
const App = componentFromStream(props$ => {
  console.log(props$)
  return new Observable(observer => {
    const wrapObserver = {
      next: x => {
        console.log(x)
        observer.next(<div onClick={increment}>aaa</div>)
      },
    }
    return props$.subscribe(wrapObserver)
  })
})
*/

/*
const App = componentFromStream(props$ => {
  return increment2$.mapTo(1).map(count => {
    console.log(count)
    return (
      <div>
        {count}
        <button onClick={increment}>aaa</button>
      </div>
    )
  })
})
*/

export default App
