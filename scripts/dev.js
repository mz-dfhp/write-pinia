import esbuild from 'esbuild'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import minimist from 'minimist'
//解析命令行参数的  node scripts/dev.js pinia -f global

const require = createRequire(import.meta.url)
const __dirname = dirname(fileURLToPath(import.meta.url))
const args = minimist(process.argv.slice(2)) // { _: [ 'pinia' ], f: 'glabal' }

const target = args._[0] || 'pinia' // pinia
const format = args.f || 'global' // glabal

// 开发环境只打包某一个模块
const pkg = require(`../packages/${target}/package.json`)

/**
 * 打包格式
 * iife => 立即执行函数 (function(){})()
 * cjs => node module.exports
 * esm => esModule import
 */
const outputFormat = format.startsWith('global')
  ? 'iife'
  : format === 'cjs'
  ? 'cjs'
  : 'esm'

const postfix = format.endsWith('-runtime')
  ? `runtime.${format.replace(/-runtime$/, '')}`
  : format

// 输出文件目录 packages\pinia\dist\pinia.glabal.js
const outfile = resolve(
  __dirname,
  `../packages/${target}/dist/${target}.${postfix}.js`
)

// 打包
esbuild
  .context({
    entryPoints: [resolve(__dirname, `../packages/${target}/src/index.ts`)], // 入口
    outfile, //输出文件
    bundle: true, // 打包到一起
    sourcemap: true,
    format: outputFormat, // 输出格式
    globalName: pkg.buildOptions?.name, // 打包全局的名字
    platform: format === 'cjs' ? 'node' : 'browser' // 平台
  })
  .then((ctx) => ctx.watch())
