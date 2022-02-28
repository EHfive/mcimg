import path from 'path'
import { writeFile, readFile, mkdir, stat } from 'fs/promises'
import { promisify } from 'util'
import { gzip } from 'zlib'

import sharp from 'sharp'
import { Palette, McImageQuantizer, genSchemUncompressed } from '@mcimg/core'
import { getBasicColors } from '@mcimg/mc-data'

export default async function convert(args) {
  let { image: imagePath, schem: schemPath } = args

  const { dir, name, base } = path.parse(schemPath || imagePath)

  if (!schemPath) {
    schemPath = path.format({
      dir,
      name,
      ext: '.schem',
    })
  }

  const previewPath = path.format({
    dir,
    base: base + '.png',
  })

  const { data, info } = await sharp(imagePath)
    .resize({
      width: 512,
      height: 512,
      fit: sharp.fit.inside,
      background: { r: 255, g: 255, b: 255, alpha: 255 },
    })
    .normalize()
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const palette = new Palette(getBasicColors())
  const colors = new McImageQuantizer({ palette }).quantize(
    info.width,
    info.height,
    data
  )
  const schem = await promisify(gzip)(
    genSchemUncompressed(info.width, info.height, colors)
  )

  await writeFile(schemPath, schem)
}
