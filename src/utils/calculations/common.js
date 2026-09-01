export const isFiniteNumber = (...values) => values.every(Number.isFinite)

export function assertFinite(values, message = 'Enter valid numeric values.') {
  if (!isFiniteNumber(...values)) throw new Error(message)
}

export function round(value, digits = 2) {
  if (!Number.isFinite(value)) throw new Error('The result is outside the supported numeric range.')
  const factor = 10 ** digits
  return Math.round((value + Number.EPSILON) * factor) / factor
}

export function roundSignificant(value, digits = 10) {
  if (!Number.isFinite(value)) throw new Error('The result is outside the supported numeric range.')
  return value === 0 ? 0 : Number(value.toPrecision(digits))
}

export function parseNumberList(value, label = 'values') {
  const raw = String(value).trim()
  if (!raw) throw new Error(`Enter at least one ${label}.`)
  const tokens = raw.includes(',') ? raw.split(',').map(token => token.trim()) : raw.split(/\s+/)
  if (tokens.some(token => token === '')) throw new Error(`Remove blank entries from ${label}.`)
  const numbers = tokens.map(Number)
  if (!numbers.every(Number.isFinite)) throw new Error(`Enter only valid numbers for ${label}.`)
  return numbers
}
