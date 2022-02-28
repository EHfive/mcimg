import nbt from 'prismarine-nbt'

function* idxIter(width, height, dir = [1, 1]) {
  for (let y = 0; y < height; ++y) {
    let yOff
    if (dir[1] < 0) yOff = (height - y - 1) * width
    else yOff = y * width
    for (let x = 0; x < width; ++x) {
      let xOff
      if (dir[0] < 0) xOff = width - x - 1
      else xOff = x
      yield xOff + yOff
    }
  }
}

const AIR_NAME = 'air'

export function genSchemUncompressed(
  width,
  height,
  colors,
  dataVersion = 2865
) {
  let idCount = 0
  const palette = {}
  const blockData = []

  for (const idx of idxIter(width, height, [1, 1])) {
    const color = colors[idx]

    const name = color.name || AIR_NAME
    const p = palette[name]
    let id
    if (!p) {
      id = idCount++
      palette[name] = { type: 'int', value: id }
    } else {
      id = p.value
    }

    while ((id & -128) !== 0) {
      blockData.push(((id | 128) << 24) >> 24)
      id >>>= 7
    }
    blockData.push((id << 24) >> 24)
  }

  const nbtValue = {
    type: 'compound',
    name: 'Schematic',
    value: {
      Version: { type: 'int', value: 2 },
      Width: { type: 'short', value: width },
      Height: { type: 'short', value: 1 },
      Length: { type: 'short', value: height },
      Metadata: {
        type: 'compound',
        value: {
          WEOffsetX: { type: 'int', value: -width / 2 },
          WEOffsetY: { type: 'int', value: -1 },
          WEOffsetZ: { type: 'int', value: -height / 2 },
        },
      },
      PaletteMax: { type: 'int', value: idCount },
      Palette: {
        type: 'compound',
        value: palette,
      },
      DataVersion: { type: 'int', value: dataVersion },
      BlockData: {
        type: 'byteArray',
        value: blockData,
      },
    },
  }

  return nbt.writeUncompressed(nbtValue)
}
