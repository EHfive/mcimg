const mcVersion = require('./_mc-version.cjs')
const mcData = require('minecraft-data')(mcVersion)
const colors = require('./data/colors.json')

const res = []

for (let c of colors) {
  const name = c.name.replace('minecraft:', '')
  if (name === 'white_terracotta') continue
  const b = mcData.blocksByName[name]
  if (!b) throw Error(`block ${c.name} not found`)
  res.push({
    ...c,
    name: b.name,
    displayName: b.displayName,
  })
}

module.exports = res
