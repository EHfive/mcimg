import { writeFile, mkdir } from 'fs/promises'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { gzipSync } from 'zlib'

import { getBasicColors } from '@mcimg/mc-data'

import {
  Palette,
  McImageQuantizer,
  genSchemUncompressed,
} from '../lib/index.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function ranNum() {
  return Math.round(Math.random() * 255)
}

async function convertRandom() {
  const w = 256
  const h = 256
  const image = new Uint8Array(w * h * 4)

  for (let i = 0; i < w * h * 4; i += 4) {
    image[i] = ranNum()
    image[i + 1] = ranNum()
    image[i + 2] = ranNum()
    image[i + 3] = 255
  }

  const palette = new Palette(getBasicColors())
  const quantizer = new McImageQuantizer({
    palette,
    imageQuantization: 'nearest',
  })
  const colors = quantizer.quantize(w, h, image)
  const schem = gzipSync(genSchemUncompressed(w, h, colors))

  const outDir = path.resolve(__dirname, '../dist')
  try {
    await mkdir(outDir)
  } catch (e) {
    if (e.code !== 'EEXIST') throw e
  }
  await writeFile(path.join(outDir, 'random.schem'), schem)
}

await convertRandom()
