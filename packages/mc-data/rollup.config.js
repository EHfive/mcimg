import { babel } from '@rollup/plugin-babel'

export default {
  input: 'src/index.js',
  output: [
    {
      dir: 'dist/esm',
      format: 'es',
    },
    {
      dir: 'dist/cjs',
      format: 'cjs',
    },
  ].map((i) => ({ ...i, preserveModules: true, preserveModulesRoot: 'src' })),
  plugins: [babel({ babelHelpers: 'bundled' })],
}
