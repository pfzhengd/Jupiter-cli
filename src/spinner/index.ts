const logUpdate = require('log-update')
const spinners = ['-', '\\', '|', '/']

export function info (text:string) {
  let i = 0
  const timer = setInterval(() => {
    const frame = spinners[i = ++i % spinners.length]
    logUpdate(`${frame} ${text}`)
  }, 80)
  return {
    clear: function clear () {
      logUpdate.clear()
      clearInterval(timer)
    }
  }
}
