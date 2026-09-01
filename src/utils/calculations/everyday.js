import { assertFinite, parseNumberList } from './common'

export function fuelConsumption(distance, fuel, price = 0) {
  assertFinite([distance, fuel, price])
  if (distance <= 0 || fuel <= 0 || price < 0) throw new Error('Distance and fuel must be above zero; price cannot be negative.')
  const kmPerLiter = distance / fuel
  return { litersPer100Km: fuel / distance * 100, kmPerLiter, mpgUS: kmPerLiter * 2.352145833, mpgImperial: kmPerLiter * 2.824809363, cost: fuel * price }
}

export function weightedGpa(gradesValue, creditsValue, scaleMaximum = 4) {
  const grades = parseNumberList(gradesValue, 'grade points'), credits = parseNumberList(creditsValue, 'credit hours')
  assertFinite([scaleMaximum])
  if (grades.length !== credits.length) throw new Error('Enter the same number of grades and credit values.')
  if (scaleMaximum <= 0 || scaleMaximum > 10 || grades.some(value => value < 0 || value > scaleMaximum) || credits.some(value => value <= 0)) throw new Error(`Grade points must be from 0–${scaleMaximum}; credits must be above zero.`)
  const totalCredits = credits.reduce((a, b) => a + b, 0)
  return { gpa: grades.reduce((sum, grade, index) => sum + grade * credits[index], 0) / totalCredits, credits: totalCredits }
}

export function weightedGrade(scoresValue, weightsValue) {
  const scores = parseNumberList(scoresValue, 'scores'), weights = parseNumberList(weightsValue, 'weights')
  if (scores.length !== weights.length) throw new Error('Enter the same number of scores and weights.')
  if (scores.some(value => value < 0 || value > 100) || weights.some(value => value < 0 || value > 100)) throw new Error('Scores and weights must be from 0–100.')
  const totalWeight = weights.reduce((a, b) => a + b, 0)
  if (Math.abs(totalWeight - 100) > 1e-9) throw new Error('Weights must total exactly 100%.')
  return { grade: scores.reduce((sum, score, index) => sum + score * weights[index] / 100, 0) }
}
