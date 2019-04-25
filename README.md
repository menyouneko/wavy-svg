# A simple SVG wavy line component
Based on SVG + CSS<br>
[[中文文档](https://github.com/menyouneko/wavy-svg/blob/master/README_CN.md)]

## 1、Install
① script tag
```html
<script src='/your/path/to/wavy-svg.min.js'></script>
```
② NPM install
```
npm i wavy-svg
```
then
```javascript
import WavySvg from 'wavy-svg'
```


## 2、Use
① create WavySvg instance
```javascript
const el = document.getElementById('svg1') // Or you can use the $refs reference in vue
const svgInstance = new WavySvg(el, { // params
  color: 'green'
})
```
② pause
```javascript
svgInstance.stop()
```
③ restart after pausing
```javascript
svgInstance.run()
```

## 3、Parameter List
WavgSvg accepts two arguments, the first being a required DOM argument and the second being an optional options object.
```javascript
new WavySvg(el, ?options)
```
① el <br>
```
el: HTMLNodeElement
```

② options <br>
Options can be an object, or you can wrap multiple objects with an array, <br>
When options is an array, multiple svg images are generated, and the svg image order is the order of the arrays.
```js
{
  // Wave height
  // default: 20
  waveHeight: number,

  // In addition to the svg wave line, the height of the base, please refer to the description below.
  // default: 0
  baseHeight: number,

  // Wavy line color
  // default: transparent
  color: string,

  // Gradient effect is produced when endColor is set.
  // Note that when using gradients, color and endColor cannot use color strings such as red, green, etc.
  // default: null
  endColor: string,

  // Used to adjust the curvature of the generated wave (can be understood as amplitude), the value cannot exceed the waveHeight.
  // default: waveHeight / 2 or 0
  curve: number,

  // Delay in animation motion, in ms.
  // default: 0
  delay number,

  // The duration of a motion cycle, in ms.
  // default: 2000
  duration: number
}
```
![baseHeight description](https://menyouneko.github.io/wavy-svg/examples/img/Snipaste_2019-04-12_14-26-42.png)

## 4、Example
[demo address](https://menyouneko.github.io/wavy-svg/examples/index.html)

![use cases 1](https://menyouneko.github.io/wavy-svg/examples/img/1.gif)
```html
<div id='svg1' style='width: 200px; height: 200px;'>
</div>
```
```javascript
// svg1
let instance1 = new WavySvg(document.getElementById('svg1'), {
  waveHeight: 40,
  baseHeight: 20,
  color: 'green',
  curve: 20,
  delay: Math.random() * 1 * 100,
  duration: 2500
})
```

![use cases 2](https://menyouneko.github.io/wavy-svg/examples/img/2.gif)
```html
<div id='svg2' style='width: 200px; height: 200px; border-radius: 50%; overflow: hidden;'>
</div>
```
```javascript
// svg2
let instance2 = new WavySvg(document.getElementById('svg2'),  [{
  waveHeight: 40,
  baseHeight: 60,
  color: 'rgba(154, 42, 120, 0.3)',
  curve: 20,
  delay: Math.random() * 1 * 200,
  duration: 2500
}, {
  waveHeight: 30,
  baseHeight: 40,
  color: 'rgba(34, 169, 126, 0.5)',
  curve: 15,
  delay: Math.random() * 1 * 300,
  duration: 2500
}])
```

![use cases 3](https://menyouneko.github.io/wavy-svg/examples/img/3.gif)
```html
<div id='svg3' style='width: 200px; height: 200px; border-radius: 50%; overflow: hidden;'>
</div>
```
```javascript
// svg1
let instance3 = new WavySvg(document.getElementById('svg3'), [{
  waveHeight: 40,
  baseHeight: 100,
  color: 'rgba(154, 42, 120, 0.3)',
  endColor: 'rgba(254, 198, 115, 0.5)',
  curve: 20,
  delay: Math.random() * 1 * 200,
  duration: 2500
}, {
  waveHeight: 30,
  baseHeight: 60,
  color: 'rgba(250, 49, 5, 0.5)',
  endColor: 'rgba(247, 163, 101, 0.7)',
  curve: 15,
  delay: Math.random() * 1 * 300,
  duration: 2500
}])
```

Pause and run call the stop and run of the instance.