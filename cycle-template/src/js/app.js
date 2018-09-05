import '../scss/style.scss'
import xs from 'xstream'
import dropRepeats from 'xstream/extra/dropRepeats';
import { p, nav, span, div } from '@cycle/dom'
import isolate from '@cycle/isolate'
import routes from './routes'
import slider from './slider'

function navigation(path) {
  return nav([
    span({ class: { active: path === '/home' } }, 'home'),
    span({ class: { active: path === '/about' } }, 'about')
  ])
}

function intent(sources) {
  return sources.DOM
    .select('nav :not(.active)')
    .events('mousedown')
}

function model(change$) {
  return change$
    .map(e => e.target.innerHTML)
    .compose(dropRepeats())
}

function view(history$, slider$) {
  return xs
    .combine(history$, slider$)
    .map(([history, slider]) => {
      const { pathname } = history;
      return div([
        navigation(pathname),
        routes[pathname] || h1('404 not found'),
        p(JSON.stringify(history)),
        slider
      ])
    })
}

export default function(sources) {
  const sliderSinks = isolate(slider)({ DOM: sources.DOM })
  const intent$ = intent(sources)
  const change$ = model(intent$)
  const vdom$ = view(sources.history, sliderSinks.DOM)
  const sinks = { DOM: vdom$, history: change$ }
  return sinks
}
