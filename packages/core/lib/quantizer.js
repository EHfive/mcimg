import { applyPaletteSync, utils } from 'image-q'

export class McImageQuantizer {
  constructor(options) {
    this._palette = options.palette
    this._imageQPalette = this._palette._toImageQPalette()
    this._colorDistanceFormula = options.colorDistanceFormula || 'ciede2000'
    this._imageQuantization = options.imageQuantization || 'jarvis'
  }

  quantize(width, height, data) {
    const inContainer = utils.PointContainer.fromUint8Array(data, width, height)
    const outContainer = applyPaletteSync(inContainer, this._imageQPalette, {
      colorDistanceFormula: this._colorDistanceFormula,
      imageQuantization: this._imageQuantization,
    })

    const colors = []
    for (const p of outContainer.getPointArray()) {
      colors.push(this._palette._getColorByUint32(p.uint32) || null)
    }

    return colors
  }
}
