import xs from 'xstream'
import { div, input } from '@cycle/dom'

function intent(DOM) {
  return DOM.select('.slider').events('input').map(ev => ev.target.value)
}

function model(change$) {
  return change$.startWith(0)
}

function view(value$) {
  return value$.map(value => div('.label-slider', [
    input('.slider', {
      attrs: { type: 'range', min: 0, max: 100, value: value }
    }),
    div(value)
  ]))
}

export default function(sources) {
  const change$ = intent(sources.DOM)
  const value$ = model(change$)
  const view$ = view(value$)
  const sinks = { DOM: view$ }
  return sinks
}