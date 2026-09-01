import { describe, expect, it } from 'vitest'
import { compoundInterest, discount, loan, profitLoss, savings, simpleInterest, tip } from './finance'

describe('everyday finance',()=>{
  it('calculates and splits a tip',()=>expect(tip(100,15,2)).toEqual({tip:15,total:115,perPerson:57.5}))
  it('accepts zero bill and tip but rejects invalid people',()=>{expect(tip(0,0,1).total).toBe(0);expect(()=>tip(100,15,0)).toThrow();expect(()=>tip(100,15,1.5)).toThrow()})
  it('calculates one discount',()=>expect(discount(100,20)).toEqual({savings:20,final:80,equivalentPercent:20}))
  it('compounds sequential discounts',()=>expect(discount(100,20,10)).toEqual({savings:28,final:72,equivalentPercent:28.000000000000004}))
  it('rejects discounts outside 0–100%',()=>expect(()=>discount(100,101)).toThrow())
  it('calculates a no-interest savings goal',()=>expect(savings(12000,20,2000)).toEqual({remaining:10000,monthly:500}))
  it('rejects fractional months and current savings above goal',()=>{expect(()=>savings(1000,2.5)).toThrow();expect(()=>savings(1000,2,1001)).toThrow()})
})
describe('profit and interest',()=>{
  it('distinguishes profit amount, markup, and margin',()=>{const result=profitLoss(100,150);expect(result).toMatchObject({status:'Profit',amount:50,markup:50});expect(result.margin).toBeCloseTo(100/3,12)})
  it('shows loss magnitude and signed rates',()=>{const result=profitLoss(100,75);expect(result).toMatchObject({status:'Loss',amount:25,markup:-25});expect(result.margin).toBeCloseTo(-100/3,12)})
  it('marks zero-revenue margin unavailable',()=>expect(profitLoss(100,0).margin).toBeNull())
  it('calculates simple interest with percent converted to decimal',()=>expect(simpleInterest(1000,5,2)).toEqual({interest:100,total:1100}))
  it('supports zero principal/rate/time and rejects negatives',()=>{expect(simpleInterest(0,0,0).total).toBe(0);expect(()=>simpleInterest(-1,5,2)).toThrow()})
  it('calculates monthly compound interest',()=>expect(compoundInterest(1000,5,1,12).total).toBeCloseTo(1051.16189788,8))
  it('supports zero rate and rejects invalid frequency',()=>{expect(compoundInterest(1000,0,10,12).total).toBe(1000);expect(()=>compoundInterest(1000,5,1,0)).toThrow()})
})
describe('fixed-payment loan',()=>{
  it('handles a 0% 12-month loan',()=>expect(loan(12000,0,12)).toEqual({monthly:1000,total:12000,interest:0}))
  it('uses the standard amortization payment formula',()=>expect(loan(10000,6,36).monthly).toBeCloseTo(304.2193745156,9))
  it('retains full precision before display rounding',()=>expect(loan(10000,6,36).total).toBeCloseTo(10951.89748256,8))
  it('rejects fractional or zero payment counts',()=>{expect(()=>loan(12000,0,0)).toThrow();expect(()=>loan(12000,0,12.5)).toThrow()})
})
