import { createElementNS, isDOM, getClientSize, warn, creatSvgPath } from './utils'
import { SVG_NAME, WRAP_CLASS, STOP_CLASS, SVG_MAIN_CLASS, SVG_BASE_CLASS } from './config'
import './index.less'

let id = 1

class WavySvg {
  status = 1 // 0: stop, 1: active
  wrap = null // svg wrap element
  size = {
    width: 0,
    height: 0
  }

  constructor (el, options = {}) {
    if (el && options) {
      this.initWrap(el)
      this.createWave(options instanceof Array ? options : [options])
      el.append(this.wrap)
    } else {
      warn('illegal parameters')
    }
  }

  initWrap = (el) => {
    if (!isDOM(el)) {
      warn('el is not a HTMLElement')
      return
    }
    const { width, height } = getClientSize(el)
    this.wrap = createWrap(this.size = { width, height })
  }

  createWave = (options) => {
    if (!this.wrap) {
      return
    }
    for (let i = 0, l = options.length; i < l; i++) {
      const option = options[i]
      const { width = 0 } = this.size
      let { baseHeight = 0, color } = option
      const base = createBase({ width, baseHeight, color })
      const svg = createSvg(Object.assign({ width }, option))
      this.wrap.append(svg)
      this.wrap.append(base)
      id++
    }
  }

  run () {
    if (this.status === 0) {
      this.status = 1
      this.wrap.classList.remove(STOP_CLASS)
    }
  }

  stop () {
    if (this.status === 1) {
      this.status = 0
      this.wrap.classList.add(STOP_CLASS)
    }
  }
}

function createWrap ({ width = 0, height = 0 }) {
  const wrap = document.createElement('div')
  wrap.setAttribute('class', WRAP_CLASS)
  wrap.setAttribute('style', `width: ${width}px;height: ${height}px;`)
  return wrap
}

function createBase ({ baseHeight, color }) {
  const base = document.createElement('div')
  base.setAttribute('class', SVG_BASE_CLASS)
  base.setAttribute('style', `height: ${baseHeight}px;background-color:${color};z-index: ${id}`)
  return base
}

function createSvg ({ width, waveHeight = 20, baseHeight = 0, color = 'transparent', curve, delay = 0, duration = 2000 }) {
  if (!curve) {
    curve = !isNaN(waveHeight) ? waveHeight / 2 : 0
  }
  const name = `${SVG_NAME}-${id}`
  const wrap = document.createElement('div')
  wrap.setAttribute('class', SVG_MAIN_CLASS)
  wrap.setAttribute('data-svg-name', name)
  wrap.setAttribute('style', `bottom: ${baseHeight}px;z-index:${id}`)

  const svg = createElementNS('svg')
  svg.setAttribute('width', width * 2 + 'px')
  svg.setAttribute('height', waveHeight + 'px')
  svg.setAttribute('style', `animation-duration:${duration / 1000}s;animation-delay:${delay / 1000}s`)

  const defs = createElementNS('defs')
  const linearGradient = createElementNS('linearGradient')
  const stop1 = createElementNS('stop')
  const stop2 = createElementNS('stop')
  const path = createElementNS('path')
  path.setAttribute('d', creatSvgPath({ width: width * 2, height: waveHeight, curve }))
  path.setAttribute('fill', color)
  linearGradient.appendChild(stop1)
  linearGradient.appendChild(stop2)
  defs.appendChild(linearGradient)
  svg.appendChild(defs)
  svg.appendChild(path)
  wrap.appendChild(svg)
  return wrap
}

export default WavySvg
