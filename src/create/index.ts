import { Options } from '../../lib/types'
import { rootPathName, tempPathName } from '../config'
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

export function createProject (options:Options, sourcePath:string) {
  const { name } = options
  const projectPath = `${rootPathName}${name}`
  if (!fse.pathExistsSync(projectPath)) {
    fse.ensureDir(projectPath)
  }
  changePackageJson(options)
  fse.copySync(tempPathName, projectPath)
  fse.removeSync(`${projectPath}/.git`)
  clearTemp()
}

export function clearTemp () {
  fse.removeSync(tempPathName)
}
