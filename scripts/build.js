
const fs = require('fs')
const rollup = require('rollup')
const config = require('./config')

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}

if (!fs.existsSync('publish')) {
  fs.mkdirSync('publish')
}

let builds = config.getAllBuilds()

build(builds)

async function build (builds) {
  for (let i = 0, total = builds.length; i < total; i++) {
    const config = builds[i]
    const output = config.output
    const bundle = await rollup.rollup(config)
    await bundle.generate(output)
    await bundle.write(output)
  }
}
