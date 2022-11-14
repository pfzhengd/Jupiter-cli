import chalk from 'chalk'
import { Options } from '..'
import { rootPathName } from '../config'
import { clearTemp, createProject } from '../create'
import { info } from '../spinner'
const { spawn } = require('child_process')

export function clone (repoAddress:string, targetPath:string, options:Options) {
  const log = info('正在下载模板。。。')
  clearTemp()
  const cmd = spawn('git', ['clone', repoAddress, targetPath], { stdio: 'inherit' })
  cmd.on('close', (status:number, other:any) => {
    log.clear()
    if (status === 0) {
      console.log(chalk.green('下载模板成功。'))
      createProject(options, rootPathName)
    } else {
      console.log(chalk.redBright('下载模板时出现了错误', other))
    }
  })
  cmd.on('error', (errMsg) => {
    console.log('error', errMsg)
  })
}
