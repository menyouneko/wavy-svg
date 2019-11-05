const path = require('path')
const node = require('rollup-plugin-node-resolve')
const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const less = require('rollup-plugin-less')
const { terser } = require('rollup-plugin-terser')
const { author, version, name } = require('../package.json')
const packageName = name
const copyright = new Date().getFullYear() > 2019 ? '2019-' + new Date().getFullYear() : 2019

const banner =
  '/*\n' +
  ` * ${packageName} v${version}\n` +
  ` * (c) ${copyright} ${author}\n` +
  ' * Released under the MIT License.\n' +
  ' */'

const resolve = p => path.resolve(__dirname, '../', p)

function strTrans(str) {
  let arr = str.split('-')
  for (let i = 0, l = arr.length; i < l; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substring(1)
  }
  return arr.join('')
}

const builds = {
  'web': {
    entry: resolve('src/index.js'),
    dest: resolve(`dist/${packageName}.min.js`),
    format: 'iife',
    env: 'production',
    banner
  },
  'web-dev': {
    entry: resolve('src/index.js'),
    dest: resolve(`dist/${packageName}.dev.js`),
    format: 'iife',
    env: 'development',
    banner
  },
  'cjs': {
    entry: resolve('src/index.js'),
    dest: resolve(`dist/${packageName}.cjs.js`),
    format: 'cjs',
    env: 'production',
    banner
  },
  'esm': {
    entry: resolve('src/index.js'),
    dest: resolve(`dist/${packageName}.esm.js`),
    format: 'esm',
    env: 'production',
    banner
  },
  publish: {
    entry: resolve('src/index.js'),
    dest: resolve(`publish/index.js`),
    format: 'esm',
    env: 'production',
    banner
  }
}

function genConfig(name) {
  const opts = builds[name]
  return {
    input: opts.entry,
    output: {
      file: opts.dest,
      format: opts.format,
      banner: opts.banner,
      name: opts.moduleName || strTrans(packageName) || 'WavySvg'
    },
    plugins: [
      node(),
      babel({
        exclude: 'node_modules/**'
      }),
      commonjs(),
      less({
        insert: true
      }),
      opts.env === 'production' ? terser({
        compress: {
          drop_console: true
        },
        output: {
          comments: /!|Nicole Wong|License/i
        }
      }) : null
    ].concat(opts.plugins || [])
  }
}

let config = {}

if (process.env.TARGET) {
  config = genConfig(process.env.TARGET)
} else {
  config = {
    getAllBuilds: () => Object.keys(builds).map(genConfig)
  }
}

module.exports = config
