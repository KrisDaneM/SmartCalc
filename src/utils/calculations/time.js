import { assertFinite } from './common'

export function parseLocalDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error('Choose a valid date.')
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) throw new Error('Choose a valid date.')
  return date
}
const utcDay = date => Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000
const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()
function addCalendarMonths(date, months) {
  const targetMonth = date.getMonth() + months
  const year = date.getFullYear() + Math.floor(targetMonth / 12)
  const month = ((targetMonth % 12) + 12) % 12
  return new Date(year, month, Math.min(date.getDate(), daysInMonth(year, month)))
}

export function daysBetween(startValue, endValue) {
  const start = parseLocalDate(startValue), end = parseLocalDate(endValue)
  if (end < start) throw new Error('End date cannot be before start date.')
  return { days: utcDay(end) - utcDay(start) }
}

export function ageOn(birthValue, onValue) {
  const birth = parseLocalDate(birthValue), on = parseLocalDate(onValue)
  if (on < birth) throw new Error('The calculation date cannot be before the birth date.')
  let years = on.getFullYear() - birth.getFullYear()
  let anniversary = addCalendarMonths(birth, years * 12)
  if (anniversary > on) { years--; anniversary = addCalendarMonths(birth, years * 12) }
  let months = 0
  while (months < 11 && addCalendarMonths(anniversary, months + 1) <= on) months++
  const monthAnniversary = addCalendarMonths(anniversary, months)
  return { years, months, days: utcDay(on) - utcDay(monthAnniversary), totalDays: utcDay(on) - utcDay(birth) }
}

export function countdown(targetValue, now = new Date()) {
  if (!(now instanceof Date) || Number.isNaN(now.getTime())) throw new Error('Current time is invalid.')
  if (typeof targetValue !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(targetValue)) throw new Error('Choose a valid local target date and time.')
  const [datePart, timePart] = targetValue.split('T'), date = parseLocalDate(datePart)
  const [hours, minutes] = timePart.split(':').map(Number)
  if (hours > 23 || minutes > 59) throw new Error('Choose a valid local target date and time.')
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes)
  const difference = target.getTime() - now.getTime()
  if (difference < 0) throw new Error('Target date and time must be in the future.')
  const totalSeconds = Math.floor(difference / 1000)
  return { days: Math.floor(totalSeconds / 86400), hours: Math.floor(totalSeconds % 86400 / 3600), minutes: Math.floor(totalSeconds % 3600 / 60), seconds: totalSeconds % 60 }
}

export function workHours(start, end, breakMinutes = 0, overnight = true) {
  if (!/^\d{2}:\d{2}$/.test(start) || !/^\d{2}:\d{2}$/.test(end)) throw new Error('Enter valid start and end times.')
  assertFinite([breakMinutes])
  const toMinutes = value => { const [hours, minutes] = value.split(':').map(Number); if (hours > 23 || minutes > 59) throw new Error('Enter valid start and end times.'); return hours * 60 + minutes }
  let duration = toMinutes(end) - toMinutes(start)
  if (duration < 0 && overnight) duration += 1440
  if (duration < 0) throw new Error('End time must follow start time.')
  if (breakMinutes < 0 || breakMinutes > duration) throw new Error('Break duration cannot be negative or exceed the shift.')
  duration -= breakMinutes
  return { hours: Math.floor(duration / 60), minutes: duration % 60, decimal: duration / 60 }
}
