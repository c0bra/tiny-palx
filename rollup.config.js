import buble from 'rollup-plugin-buble';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: './index.js',
  output: {
    format: 'cjs',
    file: './dist/index.js',
  },
  plugins: [
    resolve(),
    commonjs(),
    buble(),
    filesize(),
  ],
};