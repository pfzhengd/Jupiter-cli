import inquirer from 'inquirer'
import { clone } from './clone'
import config, { tempPathName } from './config'
const packageJson = require('../../package.json')
const { program } = require('commander')

export type Options = {
  name: string,
  description: string,
  author: string,
  typescript: boolean,
  gitAddress: string
}

(async function () {
  program
    .option('-c, --create', '创建启动项目的模版')
    .option('-v, --version', '查看当前脚手架的版本')
  program.parse(process.argv)
  const options = program.opts()
  if (options.version) {
    console.log(packageJson.version)
  } else if (options.create) {
    const prompts = [
      {
        name: 'name',
        type: 'input',
        message: '请输入要启动的项目名称：',
        validate (input) {
          const done = this.async()
          if (input.length > 0) {
            done(true)
          }
        }
      },
      {
        name: 'description',
        type: 'input',
        message: '请简单的对项目进行描述：',
        validate (input) {
          const done = this.async()
          if (input.length > 0) {
            done(true)
          }
        }
      },
      {
        name: 'author',
        type: 'input',
        message: '请输入项目的主要作者：',
        validate (input) {
          const done = this.async()
          if (input.length > 0) {
            done(true)
          }
        }
      },
      {
        name: 'typescript',
        type: 'confirm',
        message: '是否要使用 TypeScript？'
      }
    ]
    const result: Options = await inquirer.prompt(prompts)
    if (result) {
      let templateUrl = config.js
      if (!result.typescript) {
        templateUrl = config.ts
      }
      clone(templateUrl, tempPathName, result)
    }
  }
})()
