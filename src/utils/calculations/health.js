import { assertFinite } from './common'

export function bmi(weight, height, unit = 'metric') {
  assertFinite([weight, height], 'Enter a valid height and weight.')
  if (!['metric', 'imperial'].includes(unit)) throw new Error('Choose metric or imperial units.')
  const metric = unit === 'metric'
  if (metric && (weight < 20 || weight > 500 || height < 80 || height > 250)) throw new Error('Enter a weight from 20–500 kg and height from 80–250 cm.')
  if (!metric && (weight < 44 || weight > 1102 || height < 31.5 || height > 98.5)) throw new Error('Enter a weight from 44–1,102 lb and height from 31.5–98.5 in.')
  const value = metric ? weight / (height / 100) ** 2 : 703 * weight / height ** 2
  const category = value < 18.5 ? 'Underweight' : value < 25 ? 'Healthy range' : value < 30 ? 'Overweight' : 'Obesity range'
  return { value, category }
}

export function heartRate(age) {
  assertFinite([age])
  if (!Number.isInteger(age) || age < 10 || age > 100) throw new Error('Enter a whole-number age from 10 to 100.')
  const maximum = 208 - 0.7 * age
  return { maximum, light: [maximum * .5, maximum * .6], moderate: [maximum * .6, maximum * .7], vigorous: [maximum * .7, maximum * .85] }
}

export function waistHeight(waist, height) {
  assertFinite([waist, height])
  if (waist < 20 || waist > 300 || height < 50 || height > 300) throw new Error('Enter realistic positive measurements in the same unit.')
  const ratio = waist / height
  const interpretation = ratio < .4 ? 'Below typical screening range' : ratio < .5 ? 'Lower health-risk range' : ratio < .6 ? 'Increased health-risk range' : 'High health-risk range'
  return { ratio, interpretation }
}

export function water(weight, activityMinutes = 0) {
  assertFinite([weight, activityMinutes])
  if (weight < 30 || weight > 300 || activityMinutes < 0 || activityMinutes > 600) throw new Error('Enter a weight from 30–300 kg and activity from 0–600 minutes.')
  return { liters: weight * .033 + activityMinutes / 30 * .35 }
}

export function bmr(weight, height, age, sex) {
  assertFinite([weight, height, age])
  if (!['male', 'female'].includes(sex)) throw new Error('Choose the sex term used by the equation.')
  if (weight < 30 || weight > 300 || height < 100 || height > 250 || age < 18 || age > 100 || !Number.isInteger(age)) throw new Error('Enter realistic adult measurements and a whole-number age.')
  return { calories: 10 * weight + 6.25 * height - 5 * age + (sex === 'male' ? 5 : -161) }
}

export const ACTIVITY_FACTORS = Object.freeze([1.2, 1.375, 1.55, 1.725, 1.9])
export function calories(bmrValue, activity) {
  assertFinite([bmrValue, activity])
  if (bmrValue < 500 || bmrValue > 5000 || !ACTIVITY_FACTORS.includes(activity)) throw new Error('Enter a BMR from 500–5,000 and choose a listed activity factor.')
  return { maintenance: bmrValue * activity }
}
