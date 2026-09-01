import { assertFinite, parseNumberList } from './common'

export function percentageOperation(first, second, operation = 'partOfWhole') {
  assertFinite([first, second])
  if (operation === 'percentOf') return { result: first / 100 * second }
  if (operation === 'partOfWhole') {
    if (second === 0) throw new Error('The whole must be non-zero.')
    return { result: first / second * 100 }
  }
  throw new Error('Choose a valid percentage operation.')
}

export function percentage(part, whole) {
  return { percent: percentageOperation(part, whole, 'partOfWhole').result }
}

export function percentChange(original, current) {
  assertFinite([original, current])
  if (original === 0) throw new Error('Percentage change is undefined when the original value is zero.')
  const change = (current - original) / Math.abs(original) * 100
  return { change, direction: change > 0 ? 'increase' : change < 0 ? 'decrease' : 'no change' }
}

export function average(values) {
  const numbers = parseNumberList(values, 'numbers')
  const sorted = [...numbers].sort((a, b) => a - b)
  const middle = Math.floor(sorted.length / 2)
  const median = sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2
  const sum = numbers.reduce((a, b) => a + b, 0)
  return { average: sum / numbers.length, median, count: numbers.length, sum, minimum: sorted[0], maximum: sorted.at(-1) }
}

function gcd(a, b) { let x = Math.abs(a), y = Math.abs(b); while (y) [x, y] = [y, x % y]; return x }
export function ratio(a, b) {
  assertFinite([a, b])
  if (!Number.isInteger(a) || !Number.isInteger(b)) throw new Error('Enter whole numbers to simplify a ratio.')
  if (a === 0 && b === 0) throw new Error('A 0:0 ratio is undefined.')
  const divisor = gcd(a, b)
  return { ratio: `${a / divisor}:${b / divisor}`, decimal: b === 0 ? null : a / b }
}
