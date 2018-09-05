import { run } from '@cycle/run'
import { makeDOMDriver } from '@cycle/dom'
import { makeHashHistoryDriver } from '@cycle/history'
import main from './app'

const drivers = {
  DOM: makeDOMDriver('#app'),
  history: makeHashHistoryDriver()
}

run(main, drivers)