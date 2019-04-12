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

export function rgbToHex (r, g, b) {
  let hex = ((r << 16) | (g << 8) | b).toString(16)
  return '#' + new Array(Math.abs(hex.length - 7)).join('0') + hex
}

export function hexToRgb (hex) {
  let rgb = []
  let length = hex.length
  let temp = parseInt((length - 1) / 3)
  for (let i = 1; i < length; i += temp) {
    rgb.push(parseInt('0x' + hex.slice(i, i + temp)))
  }
  return rgb
}

function getRGBValue (rgb = '') {
  const match = rgb.replace(/\s+/g, '').match(/^(?:rgb(?:a)?)\(([\d(\.\d*),]*)\)$/)
  return match ? match[1].split(',') : null
}

function getColorValue (color) {
  let res = []
  if (color.startsWith('rgb')) {
    res = getRGBValue(color)
  } else if (color.startsWith('#')) {
    res = hexToRgb(color)
  } else {
    return null
  }
  return res.map(v => Number(v))
}

export function getStepColor ({ start, end, total, step }) {
  if (start === end) {
    return start
  }
  // 将 hex 转换为 rgb

  let sColor = getColorValue(start)
  let eColor = getColorValue(end)

  if (sColor && eColor) {
    let p = step / total

    // 计算 R\G\B 每一步的差值
    let rStep = (eColor[0] - sColor[0])
    let gStep = (eColor[1] - sColor[1])
    let bStep = (eColor[2] - sColor[2])
    let opacity = (eColor[3] || 1) - (sColor[3] || 1)

    return `rgba(${rStep * p + sColor[0]}, ${gStep * p + sColor[1]}, ${bStep + sColor[2]}, ${opacity * p + (sColor[3] || 1)})`
  } else {
    return null
  }
}

export function createElementNS (tagName) {
  return document.createElementNS('http://www.w3.org/2000/svg', tagName)
}
