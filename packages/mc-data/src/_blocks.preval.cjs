const mcVersion = require('./_mc-version.cjs')
const mcData = require('minecraft-data')(mcVersion)

const res = []

for (let b of mcData.blocksArray) {
  const block = {
    name: b.name,
    displayName: b.displayName,
  }
  if (Array.isArray(b.states) && b.states.length > 0) {
    block.states = b.states
  }
  res.push(block)
}

module.exports = res
