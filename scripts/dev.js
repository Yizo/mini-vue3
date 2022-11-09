const path = require('path')
const { build } = require('esbuild')
const args = require('minimist')(process.argv.slice(2))

const target = args._[0] || 'reactivity' // 打包的模块
const format = args.f || 'global'         // 打包的格式

const pkg = require(path.resolve(__dirname, `../packages/${target}/package.json`))

const outputFormat = format.startsWith('global') ? 'iife' : (format === 'cjs' ? 'cjs' : 'esm')

// reactivity.global.js
// reactivity.cjs.js
// reactivity.esm.js
const outfile = path.resolve(__dirname, `../packages/${target}/dist/${target}.${format}.js`)
console.log(outfile)

build({
    entryPoints: [path.resolve(__dirname, `../packages/${target}/src/index.ts`)],
    outfile,
    bundle: true,
    sourcemap: true,
    format: outputFormat,
    globalName: pkg.buildOptions?.name,
    platform: format === 'cjs' ? 'node' : 'browser',
    watch: {
        onRebuild(error) {
            if(!error) {
                console.log('rebuilt~~~')
            }
        }
    }
}).then(()=>{
    console.log('watching~~~')
})