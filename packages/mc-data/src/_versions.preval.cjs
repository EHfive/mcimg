const mcData = require('minecraft-data')

const sortedVersions = mcData.versions['pc'].sort(
  (a, b) => b.dataVersion - a.dataVersion
)

const res = []

function testVersion(ver) {
  return /^[0-9]+(\.[0-9]+){1}$/.test(ver)
}

for (v of sortedVersions) {
  if (v.version < 335 || !testVersion(v.minecraftVersion)) continue
  delete v.usesNetty
  res.push(v)
}

module.exports = res
