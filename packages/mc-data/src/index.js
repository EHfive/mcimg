export function getBasicColors() {
  return preval.require('_colors.preval.cjs')
}

export function getVersions() {
  return preval.require('_versions.preval.cjs')
}

export { getBlocks } from './blocks.js'
