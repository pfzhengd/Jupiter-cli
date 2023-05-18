import { execSync } from 'child_process'
import { version } from '../package.json'

test('测试 cli 的版本号', () => {
  const output = execSync('node ./bin/index -v').toString()
  expect(output).toContain(version)
})
