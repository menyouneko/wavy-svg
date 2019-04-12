export function creatSvgPath ({ width, height, curve }) {
  let x = 0
  let y = height / 2
  let path = `M0,${y} `
  let unit = width / 8
  while (x < width) {
    path += 'Q' + `${x + unit},${y + curve} ${x + 2 * unit},${y} `
    x = x + 2 * unit
    curve = curve * -1
  }
  return path + `L${width},0 ${width},${height} 0,${height}`
}

export let isDOM = (typeof HTMLElement === 'object')
  ? function (dom) {
    return dom instanceof HTMLElement
  }
  : function (dom) {
    return dom && typeof dom === 'object' && dom.nodeType === 1 && typeof dom.nodeName === 'string'
  }

export function getClientSize (dom) {
  return {
    width: dom.clientWidth,
    height: dom.clientHeight
  }
}

export function warn (message) {
  console.warn(message)
}

export function createElementNS (tagName) {
  return document.createElementNS('http://www.w3.org/2000/svg', tagName)
}
