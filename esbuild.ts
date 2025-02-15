import { build, BuildOptions } from 'esbuild'
import { Generator } from 'npm-dts'

new Generator({
  entry: 'src/index.ts',
  output: 'dist/index.d.ts',
}).generate()

const config: BuildOptions = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  tsconfig: 'tsconfig.build.json',
}

build({
  ...config,
  outfile: 'dist/index.js',
  platform: 'node',
})

build({
  ...config,
  format: 'esm',
  outfile: 'dist/index.esm.js',
  platform: 'neutral',
})
