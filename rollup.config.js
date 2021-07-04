import ts from '@rollup/plugin-typescript';

// eslint-disable-next-line arca/no-default-export
export default {
  input: `./sources/preset.ts`,

  output: [{
    dir: `lib`,
    entryFileNames: `[name].mjs`,
    format: `es`,
  }, {
    dir: `lib`,
    entryFileNames: `[name].js`,
    format: `cjs`,
  }],

  plugins: [
    ts({
      tsconfig: `tsconfig.build.json`,
    }),
  ],
};
