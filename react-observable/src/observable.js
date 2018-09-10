import SafeObserver from './safeObserver'

class Observable {
  constructor(_subscribe) {
    this._subscribe = _subscribe
  }

  subscribe(observer) {
    const safeObserver = new SafeObserver(observer)
    safeObserver.unsub = this._subscribe(safeObserver)
    return safeObserver.unsubscribe.bind(safeObserver)
  }

  of(...items) {
    return new Observable(observer => {
      for (let i = 0; i < items.length; ++i) {
        observer.next(items[i])
      }
      observer.complete()
    })
  }

  merge(...items) {
    return new Observable(observer => {
      let count = items.length
      let subscriptions = items.map(source =>
        source.subscribe({
          next(x) {
            observer.next(x)
          },
          error(err) {
            observer.error(err)
          },
          complete() {
            if (--count === 0) observer.complete()
          },
        }),
      )
      return () => subscriptions.forEach(s => s.unsubscribe())
    })
  }

  map(callback) {
    return new Observable(observer => {
      const mapObserer = {
        next: x => observer.next(callback(x)),
        error: err => observer.error(err),
        complete: () => observer.complete(),
      }
      return this.subscribe(mapObserer)
    })
  }

  mapTo(value) {
    return new Observable(observer => {
      const mapObserver = {
        next: x => observer.next(value),
        error: err => observer.error(err),
        complete: () => observer.complete(),
      }
      return this.subscribe(mapObserver)
    })
  }

  scan(callback, seed) {
    this.seed = seed
    return new Observable(observer => {
      const scanObserver = {
        next: x => {
          this.seed = callback(this.seed, x)
          observer.next(this.seed)
        },
        error: err => observer.error(err),
        complete: () => observer.complete(),
      }
      return this.subscribe(scanObserver)
    })
  }

  combine(source, vdom) {
    return new Observable(observer => {
      const wrapObserver = {
        next: x => {
          x = typeof x === 'object' && !Object.keys(x).length ? 0 : x
          observer.next(vdom(x))
        },
        error: err => observer.error(err),
        complete: () => observer.complete(),
      }
      source.subscribe(wrapObserver)
      return this.subscribe(wrapObserver)
    })
  }
}

export default (subscribe) => {
  return new Observable(subscribe)
}