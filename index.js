import tinycolor from '@ctrl/tinycolor';
import hueName from './hue-name';

const lums = [
  9,
  8,
  7,
  6,
  5,
  4,
  3,
  2,
  1,
  0
]
  .map(n => n + .5)
  .map(n => n / 10)

const luminance = (c, lum) => {
  const diff = lum - tinycolor(c).getLuminance();
  return diff > 0 ? tinycolor(c).lighten(diff) : tinycolor(c).darken(diff);
};

const createArray = length => {
  const arr = []
  for (let i = 0; i < length; i++) {
    arr.push(i)
  }
  return arr
}

const createHues = length => {
  const hueStep = 360 / length
  return base => {
    const hues = createArray(length)
      .map(n => Math.floor((base + (n * hueStep)) % 360))

    return hues
  }
}

const desat = n => hex => {
  const { h, s, l } = tinycolor(hex).toHsl()
  return tinycolor({ h, s: n, l }).toHex()
}

const createBlack = hex => {
  const d = desat(1/8)(hex)
  return tinycolor(d).darken(.95).toHex()
}

const createShades = hex => {
  return lums.map(lum => {
    return luminance(hex, lum).toHex()
  })
}

// Mappers
const keyword = hex => {
  const { h: hue, s: sat } = tinycolor(hex).toHsl()
  if (sat < .5) {
    return 'gray'
  }
  const name = hueName(hue)
  return name
}

// Reducer
const toObj = (a, color) => {
  const key = a[color.key] ? color.key + '2' : color.key
  a[key] = color.value
  return a
}

const palx = (hex, options = {}) => {
  const color = tinycolor(hex)
  const colors = []
  const { h: hue, s: sat, l: lte } = color.toHsl()

  const hues = createHues(12)(hue)

  colors.push({
    key: 'black',
    value: createBlack('' + color.toHex())
  })

  colors.push({
    key: 'gray',
    value: createShades(desat(1/8)('' + color.toHex()))
  })

  hues.forEach(h => {
    const c = tinycolor({ h, s: sat, l: lte })
    const key = keyword(c)
    colors.push({
      key,
      value: createShades('' + c.toHex())
    })
  })

  const obj = Object.assign({
    base: hex,
  }, colors.reduce(toObj, {}))

  return obj
}

module.exports = palx