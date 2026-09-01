import { assertFinite, roundSignificant } from './common'

export const converters = Object.freeze({
  length: Object.freeze({ m: 1, km: 1000, cm: .01, mm: .001, in: .0254, ft: .3048, mi: 1609.344 }),
  mass: Object.freeze({ kg: 1, g: .001, lb: .45359237, oz: .028349523125 }),
  area: Object.freeze({ 'm²': 1, 'km²': 1e6, 'ft²': .09290304, acre: 4046.8564224, hectare: 10000 }),
  volume: Object.freeze({ L: 1, mL: .001, 'm³': 1000, 'US gal': 3.785411784, 'US cup': .2365882365 }),
  speed: Object.freeze({ 'm/s': 1, 'km/h': 1 / 3.6, mph: .44704, knot: .514444444444 }),
  data: Object.freeze({ B: 1, KB: 1e3, MB: 1e6, GB: 1e9, TB: 1e12, KiB: 1024, MiB: 1024 ** 2, GiB: 1024 ** 3 }),
})

export function convert(value, from, to, type) {
  assertFinite([value])
  if (type === 'temperature') {
    if (!['C', 'F', 'K'].includes(from) || !['C', 'F', 'K'].includes(to)) throw new Error('Choose valid temperature units.')
    const celsius = from === 'C' ? value : from === 'F' ? (value - 32) * 5 / 9 : value - 273.15
    if (celsius < -273.15 - 1e-10) throw new Error('Temperature cannot be below absolute zero.')
    const result = to === 'C' ? celsius : to === 'F' ? celsius * 9 / 5 + 32 : celsius + 273.15
    return { result: roundSignificant(result) }
  }
  const units = converters[type]
  if (!units || !Object.hasOwn(units, from) || !Object.hasOwn(units, to)) throw new Error('Choose compatible units.')
  return { result: roundSignificant(value * units[from] / units[to]) }
}
