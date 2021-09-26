import { Options } from '../../lib/types'
import { rootPathName, tempPathName } from '../config'
const fs = require('fs')
const fse = require('fs-extra')

function changePackageJson (options:Options) {
  try {
    const { name, description, author } = options
    const packageJson:any = fse.readJsonSync(`${tempPathName}/package.json`)
    packageJson.name = name
    packageJson.description = description
    packageJson.author = author
    fse.writeJSONSync(`${tempPathName}/package.json`, packageJson, { spaces: 4 })
  } catch (ex) {
    throw new Error(ex)
  }
}

function changePlatform (options:Options) {
  const rootPath = `${tempPathName}/src/titan.platform`
  const platformPath = `${rootPath}.${options.typescript ? 'ts' : 'js'}`
  let content:string = fs.readFileSync(platformPath, 'utf-8')
  content = content.replace('{{name}}', options.name)
  fse.outputFileSync(platformPath, content)
}

export function createProject (options:Options, sourcePath:string) {
  const { name } = options
  const projectPath = `${rootPathName}${name}`
  if (!fse.pathExistsSync(projectPath)) {
    fse.ensureDir(projectPath)
  }
  changePlatform(options)
  changePackageJson(options)
  fse.copySync(tempPathName, projectPath)
  fse.removeSync(`${projectPath}/.git`)
  clearTemp()
}

export function clearTemp () {
  fse.removeSync(tempPathName)
}
