import '../scss/style.scss'
import $ from 'jquery'
import velocity from 'velocity-animate'
import anime from 'animejs'
import _ from 'lodash'

class Hoge {
  constructor() {
    this.id = 'fuga'
  }
  exec() {
    console.log(this)
  }
}

const hoge = new Hoge()
hoge.exec()

const fps = 1000 / 65

const endTime = 20 // 終了時間
const movePos = 20 // 1回の移動距離
let el
let pos = 0 // 現在値
let elapsedTime = 0 // 経過時間

let timeRatio = 1
let time = 0

let css
let endPos
let styleKey
let duration

const requestFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, fps)
  }

const cancelFrame = window.cancelAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.mozCancelAnimationFrame ||
  window.oCancelAnimationFrame ||
  function(id) {
    window.clearTimeout(id)
  }

const now = window.performance && (
  performance.now ||
  performance.mozNow ||
  performance.msNow ||
  performance.oNow ||
  performance.webkitNow);

const getTime = () => (now && now.call(performance)) || (new Date().getTime())

// fpsが落ちた分を埋める
function updateRatio() {
  let lastTime = time
  if (lastTime > 0) {
    timeRatio = (getTime() - lastTime) / fps
  }
  time = getTime()
  elapsedTime++
}

function drawElement() {
  pos += movePos * timeRatio
  if (pos < endPos) {
    el.style[styleKey] = `${pos}px`
  } else {
    el.style[styleKey] = `${endPos}px`
    el.style.overflow = ''
  }
}

function render() {
  if (pos > endPos) { return }
  updateRatio()
  drawElement()
  requestFrame(render)
}

function start(elm, obj) {
  [pos, elapsedTime, time] = [0, 0, 0]
  el = elm
  el.style.overflow = 'hidden'
  css = _.get(obj, 'css')
  _.each(css, function(val, key) {
    endPos = parseInt(val.replace('px', ''))
    styleKey = key
  })
  duration = _.get(obj, 'duration')

  requestFrame(render)
}

function stop(id) {
  if (id) cancelFrame(id);
}

document.getElementById('app')
  .addEventListener('click', function() {
    start(this, {
      css: { left: '500px' },
      duration: 200
    })
  })

/*
anim(targetElm, {
  css: { left: '100px' }, // アニメーション内容
  duration: normal, // アニメーション速度
  easing: linear, // イージング
  function() {} // animation end callback
})
*/

document.getElementById('jq-app')
  .addEventListener('click', function() {
    this.animate([
      { left: '0px' },
      { left: '500px' }
    ], {
      duration: 250
    })
  })


document.getElementById('v-app')
  .addEventListener('click', function() {
    velocity(this, { left: 0 })
    velocity(this, { left: 500 }, 250)
    velocity(this, { top: 500 }, 250)
    velocity(this, { left: 0 }, 250)
    velocity(this, { top: 140 }, 250)
  })


document.getElementById('a-app')
  .addEventListener('click', function() {
    this.style.left = '0px'
    anime({
      targets: document.getElementById('a-app'),
      left: 500,
      duration: 250,
      easing: 'linear'
    })
  })
