import { utils } from 'image-q'

export class Palette {
  constructor(colors) {
    this._colorsMap = {}
    for (const color of colors) {
      if (!color) throw Error()
      const c = {
        ...color,
        a: color.a ?? 255,
      }
      const uint32 = ((c.a << 24) | (c.b << 16) | (c.g << 8) | c.r) >>> 0
      this._colorsMap[uint32] = c
    }
    this._colors = Object.values(this._colorsMap)
  }

  _toImageQPalette() {
    const imageQPalette = new utils.Palette()
    for (const c of this._colors) {
      const point = utils.Point.createByRGBA(c.r, c.g, c.b, c.a)
      imageQPalette.add(point)
    }
    return imageQPalette
  }

  _getColorByUint32(uint32) {
    return this._colorsMap[uint32]
  }
}
