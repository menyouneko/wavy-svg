# 一个简单的 SVG 波浪线组件

基于 SVG + CSS 实现

## 1、安装
① script 标签
```html
<script src='/your/file/dir/wavy-svg.min.js'></script>
```
② NPM 安装
```
npm i wavy-svg
```
然后
```javascript
import WavySvg from 'wavy-svg'
```


## 2、使用
① 创建 WavySvg 实例
```javascript
const el = document.getElementById('svg1') // 或者使用 vue 中的 $refs 引用也可以
const svgInstance = new WavySvg(el, {
  color: 'green'
})
```
② 暂停
```javascript
svgInstance.stop()
```
③ 暂停后重新启动
```javascript
svgInstance.run()
```

## 3、参数一览
WavgSvg 接受两个参数，第一个是必填的 DOM 参数，第二个是可选的 options 对象。
```javaascript
new WavySvg(el, ?options)
```
① el <br>
```
el: HTMLNodeElement
```

② options <br>
options 可以为一个 object 对象，也可以用数组包裹多个 object 对象， <br>
options 为数组时，会生成多个 svg 图像，重叠关系为数组对象的顺序。
```js
{
  // 波浪的高度
  // default: 20
  waveHeight: number,

  // 除开 svg 波浪线, 底座的高度, 参考下图的说明
  // default: 0
  baseHeight: number,

  // 波浪线的颜色
  // default: transparent
  color: string,

  // 用于调整生成波浪的弯曲度（可以理解成振幅）, 值不能超过 waveHeight
  // default: waveHeight / 2 or 0
  curve: number,

  // 动画运动时的延时, 单位 ms
  // default: 0
  delay number,

  // 一个运动周期持续的时间, 单位 ms
  // default: 2000
  duration: number
}
```
![baseHeight 说明](https://menyouneko.github.io/wavy-svg/examples/img/Snipaste_2019-04-12_14-26-42.png)

## 4、示例
[Demo 地址](https://menyouneko.github.io/wavy-svg/examples/index.html)

![使用案例 1](https://menyouneko.github.io/wavy-svg/examples/img/1.gif)
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

![使用案例 2](https://menyouneko.github.io/wavy-svg/examples/img/2.gif)
```html
<div id='svg2' style='width: 200px; height: 200px;'>
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

暂停和运动调用实例的 stop 和 run 即可