import test from 'ava'
import tinypalx from './'

test('returns a color object', t => {
  const colors = tinypalx('#07c')
  t.is(typeof colors, 'object')
  t.snapshot(colors)
})

test('returns a gray object for desaturated base colors', t => {
  const colors = tinypalx('#444')
  t.is(typeof colors, 'object')
  t.snapshot(colors)
  t.is(Object.keys(colors).length, 4)
})