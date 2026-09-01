import { assertFinite } from './common'

export function tip(bill, percent, people = 1) {
  assertFinite([bill, percent, people])
  if (bill < 0 || percent < 0 || percent > 100 || !Number.isInteger(people) || people < 1 || people > 1000) throw new Error('Enter a non-negative bill, tip from 0–100%, and a whole-number party size.')
  const tipAmount = bill * percent / 100
  return { tip: tipAmount, total: bill + tipAmount, perPerson: (bill + tipAmount) / people }
}

export function discount(price, firstPercent, secondPercent = 0) {
  assertFinite([price, firstPercent, secondPercent])
  if (price < 0 || firstPercent < 0 || firstPercent > 100 || secondPercent < 0 || secondPercent > 100) throw new Error('Price must be non-negative and each discount must be from 0–100%.')
  const final = price * (1 - firstPercent / 100) * (1 - secondPercent / 100)
  return { savings: price - final, final, equivalentPercent: price === 0 ? 0 : (price - final) / price * 100 }
}

export function savings(goal, months, current = 0) {
  assertFinite([goal, months, current])
  if (goal <= 0 || !Number.isInteger(months) || months < 1 || months > 1200 || current < 0 || current > goal) throw new Error('Enter a positive goal, current savings not above the goal, and 1–1,200 whole months.')
  return { remaining: goal - current, monthly: (goal - current) / months }
}

export function profitLoss(cost, selling) {
  assertFinite([cost, selling])
  if (cost <= 0 || selling < 0) throw new Error('Cost must be above zero and selling price cannot be negative.')
  const signedProfit = selling - cost
  return { status: signedProfit > 0 ? 'Profit' : signedProfit < 0 ? 'Loss' : 'Break-even', amount: Math.abs(signedProfit), markup: signedProfit / cost * 100, margin: selling === 0 ? null : signedProfit / selling * 100 }
}

export function loan(principal, annualRate, months) {
  assertFinite([principal, annualRate, months])
  if (principal <= 0 || annualRate < 0 || annualRate > 100 || !Number.isInteger(months) || months < 1 || months > 1200) throw new Error('Enter a positive principal, annual rate from 0–100%, and 1–1,200 whole months.')
  const monthlyRate = annualRate / 1200
  const monthly = monthlyRate === 0 ? principal / months : principal * monthlyRate * (1 + monthlyRate) ** months / ((1 + monthlyRate) ** months - 1)
  return { monthly, total: monthly * months, interest: monthly * months - principal }
}

export function simpleInterest(principal, rate, years) {
  assertFinite([principal, rate, years])
  if (principal < 0 || rate < 0 || rate > 1000 || years < 0 || years > 1000) throw new Error('Enter non-negative values within the supported ranges.')
  const interest = principal * (rate / 100) * years
  return { interest, total: principal + interest }
}

export function compoundInterest(principal, rate, years, compounds = 12) {
  assertFinite([principal, rate, years, compounds])
  if (principal < 0 || rate < 0 || rate > 1000 || years < 0 || years > 1000 || !Number.isInteger(compounds) || compounds < 1 || compounds > 365) throw new Error('Enter valid non-negative values and a supported compounding frequency.')
  const total = principal * (1 + rate / 100 / compounds) ** (compounds * years)
  if (!Number.isFinite(total)) throw new Error('These values produce a result outside the supported numeric range.')
  return { total, interest: total - principal }
}
