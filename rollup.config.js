import typescript from 'rollup-plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import dts from 'rollup-plugin-dts'

export default () => {
  const template = function (fileName) {
    return {
      input: `./src/${fileName}.ts`,
      external:["inquirer","chalk"],
      output: [
        {
          format: 'cjs',
          file: `lib/main/${fileName}.js`
        }
      ],
      plugins: [
        typescript(
          {
            exclude: 'node_modules/**',
            typescript: require('typescript')
          }
        )
      ]
    }
  }

  const moduleNames = ['index']
  const config = []

  moduleNames.forEach((mouldeName) => {
    config.push(template(mouldeName))
  })

  if(process.env.NODE_ENV === 'production'){
    config.forEach(val=>{
      val.plugins.push(
        terser({
          mangle:false
        }))
    })
  }

  config.push({
    input: "./src/index.ts",
    output: [{ file: "lib/types/index.d.ts", format: "es" }],
    plugins: [dts()],
  })

  return config
}
