const finite = (...values) => values.every(Number.isFinite)
export const round = (value, digits = 2) => Number(value.toFixed(digits))

export function bmi(weight, height, unit = 'metric') {
  if (!finite(weight, height) || weight <= 0 || height <= 0) throw new Error('Enter a valid height and weight.')
  const value = unit === 'imperial' ? (703 * weight) / height ** 2 : weight / (height / 100) ** 2
  const category = value < 18.5 ? 'Underweight' : value < 25 ? 'Healthy range' : value < 30 ? 'Overweight' : 'Obesity range'
  return { value: round(value, 1), category }
}

export function heartRate(age) {
  if (!finite(age) || age < 10 || age > 100) throw new Error('Enter an age from 10 to 100.')
  const maximum = round(208 - 0.7 * age, 0)
  return { maximum, light: [round(maximum * .5, 0), round(maximum * .6, 0)], moderate: [round(maximum * .6, 0), round(maximum * .7, 0)], vigorous: [round(maximum * .7, 0), round(maximum * .85, 0)] }
}

export function waistHeight(waist, height) {
  if (!finite(waist, height) || waist <= 0 || height <= 0) throw new Error('Enter positive measurements in the same unit.')
  const ratio = waist / height
  return { ratio: round(ratio, 2), interpretation: ratio < .4 ? 'Below typical screening range' : ratio < .5 ? 'Lower health-risk range' : ratio < .6 ? 'Increased health-risk range' : 'High health-risk range' }
}

export function water(weight, activityMinutes = 0) {
  if (!finite(weight, activityMinutes) || weight < 30 || weight > 300 || activityMinutes < 0 || activityMinutes > 600) throw new Error('Enter a weight from 30–300 kg and valid activity minutes.')
  return { liters: round(weight * .033 + activityMinutes / 30 * .35, 2) }
}

export function tip(bill, percent, people = 1) {
  if (!finite(bill, percent, people) || bill < 0 || percent < 0 || percent > 100 || people < 1) throw new Error('Enter a non-negative bill and tip, and at least one person.')
  const tipAmount = bill * percent / 100
  return { tip: round(tipAmount), total: round(bill + tipAmount), perPerson: round((bill + tipAmount) / people) }
}

export function discount(price, percent) {
  if (!finite(price, percent) || price < 0 || percent < 0 || percent > 100) throw new Error('Price must be non-negative and discount must be 0–100%.')
  const savings = price * percent / 100
  return { savings: round(savings), final: round(price - savings) }
}

export function savings(goal, months, current = 0) {
  if (!finite(goal, months, current) || goal <= 0 || months < 1 || current < 0 || current > goal) throw new Error('Enter a valid goal, current savings, and at least one month.')
  return { remaining: round(goal - current), monthly: round((goal - current) / months) }
}

export function profitLoss(cost, selling) {
  if (!finite(cost, selling) || cost <= 0 || selling < 0) throw new Error('Cost must be above zero and selling price cannot be negative.')
  const amount = selling - cost
  return { amount: round(amount), status: amount > 0 ? 'Profit' : amount < 0 ? 'Loss' : 'Break-even', markup: round(amount / cost * 100), margin: selling === 0 ? null : round(amount / selling * 100) }
}

export function loan(principal, annualRate, years) {
  if (!finite(principal, annualRate, years) || principal <= 0 || annualRate < 0 || years <= 0 || years > 100) throw new Error('Enter a valid loan amount, rate, and term.')
  const payments = Math.round(years * 12), rate = annualRate / 1200
  const monthly = rate === 0 ? principal / payments : principal * rate * (1 + rate) ** payments / ((1 + rate) ** payments - 1)
  return { monthly: round(monthly), total: round(monthly * payments), interest: round(monthly * payments - principal) }
}

export function simpleInterest(principal, rate, years) {
  if (!finite(principal, rate, years) || principal < 0 || rate < 0 || years < 0) throw new Error('Values cannot be negative.')
  const interest = principal * rate * years / 100
  return { interest: round(interest), total: round(principal + interest) }
}

export function compoundInterest(principal, rate, years, compounds = 12) {
  if (!finite(principal, rate, years, compounds) || principal < 0 || rate < 0 || years < 0 || compounds < 1) throw new Error('Enter valid non-negative values.')
  const total = principal * (1 + rate / 100 / compounds) ** (compounds * years)
  return { total: round(total), interest: round(total - principal) }
}

export function percentage(part, whole) {
  if (!finite(part, whole) || whole === 0) throw new Error('The whole must be a non-zero number.')
  return { percent: round(part / whole * 100) }
}

export function percentChange(original, current) {
  if (!finite(original, current) || original === 0) throw new Error('Original value must be non-zero.')
  const change = (current - original) / Math.abs(original) * 100
  return { change: round(change), direction: change > 0 ? 'increase' : change < 0 ? 'decrease' : 'no change' }
}

export function average(values) {
  const nums = String(values).split(/[\s,]+/).filter(Boolean).map(Number)
  if (!nums.length || !nums.every(Number.isFinite)) throw new Error('Enter numbers separated by commas or spaces.')
  return { average: round(nums.reduce((a, b) => a + b, 0) / nums.length), count: nums.length, sum: round(nums.reduce((a, b) => a + b, 0)) }
}

export function ratio(a, b) {
  if (!finite(a, b) || a <= 0 || b <= 0) throw new Error('Ratio values must be above zero.')
  const gcd = (x, y) => y ? gcd(y, x % y) : x
  if (Number.isInteger(a) && Number.isInteger(b)) { const d = gcd(a, b); return { ratio: `${a / d}:${b / d}`, decimal: round(a / b, 4) } }
  return { ratio: `${a}:${b}`, decimal: round(a / b, 4) }
}

function parseLocalDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error('Choose a valid date.')
  const [y, m, d] = value.split('-').map(Number), date = new Date(y, m - 1, d)
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) throw new Error('Choose a valid date.')
  return date
}
const utcDay = (d) => Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000

export function daysBetween(startValue, endValue) {
  const start = parseLocalDate(startValue), end = parseLocalDate(endValue)
  if (end < start) throw new Error('End date cannot be before start date.')
  return { days: utcDay(end) - utcDay(start) }
}

export function ageOn(birthValue, onValue) {
  const birth = parseLocalDate(birthValue), on = parseLocalDate(onValue)
  if (on < birth) throw new Error('The calculation date cannot be before the birth date.')
  let years = on.getFullYear() - birth.getFullYear(), months = on.getMonth() - birth.getMonth(), days = on.getDate() - birth.getDate()
  if (days < 0) { months--; days += new Date(on.getFullYear(), on.getMonth(), 0).getDate() }
  if (months < 0) { years--; months += 12 }
  return { years, months, days, totalDays: utcDay(on) - utcDay(birth) }
}

export function workHours(start, end, breakMinutes = 0, overnight = true) {
  if (!/^\d{2}:\d{2}$/.test(start) || !/^\d{2}:\d{2}$/.test(end) || !finite(breakMinutes) || breakMinutes < 0) throw new Error('Enter valid times and break duration.')
  const mins = (v) => { const [h, m] = v.split(':').map(Number); return h * 60 + m }
  let duration = mins(end) - mins(start)
  if (duration < 0 && overnight) duration += 1440
  if (duration < 0) throw new Error('End time must follow start time.')
  if (breakMinutes > duration) throw new Error('Break cannot exceed the shift duration.')
  duration -= breakMinutes
  return { hours: Math.floor(duration / 60), minutes: duration % 60, decimal: round(duration / 60, 2) }
}

export function bmr(weight, height, age, sex) {
  if (!finite(weight, height, age) || weight < 30 || weight > 300 || height < 100 || height > 250 || age < 18 || age > 100) throw new Error('Enter realistic adult measurements and age.')
  return { calories: round(10 * weight + 6.25 * height - 5 * age + (sex === 'male' ? 5 : -161), 0) }
}

export function calories(bmrValue, activity) {
  if (!finite(bmrValue, activity) || bmrValue <= 0 || activity < 1.2 || activity > 1.9) throw new Error('Enter a valid BMR and activity level.')
  return { maintenance: round(bmrValue * activity, 0) }
}

export const converters = {
  length: { m: 1, km: 1000, cm: .01, mm: .001, in: .0254, ft: .3048, mi: 1609.344 },
  mass: { kg: 1, g: .001, lb: .45359237, oz: .028349523125 },
  area: { 'm²': 1, 'km²': 1e6, 'ft²': .09290304, acre: 4046.8564224, hectare: 10000 },
  volume: { L: 1, mL: .001, 'm³': 1000, 'US gal': 3.785411784, 'US cup': .2365882365 },
  speed: { 'm/s': 1, 'km/h': 1 / 3.6, mph: .44704, knot: .514444 },
  data: { B: 1, KB: 1e3, MB: 1e6, GB: 1e9, TB: 1e12, KiB: 1024, MiB: 1048576, GiB: 1073741824 },
}
export function convert(value, from, to, type) {
  if (!finite(value)) throw new Error('Enter a valid number.')
  if (type === 'temperature') {
    const c = from === 'C' ? value : from === 'F' ? (value - 32) * 5 / 9 : value - 273.15
    const result = to === 'C' ? c : to === 'F' ? c * 9 / 5 + 32 : c + 273.15
    if (result < (to === 'C' ? -273.15 : to === 'F' ? -459.67 : 0)) throw new Error('Temperature cannot be below absolute zero.')
    return { result: round(result, 6) }
  }
  const units = converters[type]
  if (!units?.[from] || !units?.[to]) throw new Error('Choose compatible units.')
  return { result: round(value * units[from] / units[to], 8) }
}
