import { describe, expect, it } from 'vitest'
import { bmi, bmr, calories, heartRate, waistHeight, water } from './health'

describe('BMI',()=>{
  it('calculates 70 kg at 175 cm without rounding internally',()=>expect(bmi(70,175).value).toBeCloseTo(22.8571428571,9))
  it('matches equivalent imperial inputs',()=>expect(bmi(70/.45359237,1.75/.0254,'imperial').value).toBeCloseTo(bmi(70,175).value,1))
  it.each([[18.49,'Underweight'],[18.5,'Healthy range'],[24.999,'Healthy range'],[25,'Overweight'],[29.999,'Overweight'],[30,'Obesity range']])('classifies boundary BMI %s',(target,category)=>expect(bmi(target*1.75**2,175).category).toBe(category))
  it('rejects invalid units and unrealistic inputs',()=>{expect(()=>bmi(0,175)).toThrow();expect(()=>bmi(70,175,'stone')).toThrow()})
})
describe('health estimates',()=>{
  it('uses the Tanaka maximum-heart-rate estimate and percentage zones',()=>expect(heartRate(40)).toEqual({maximum:180,light:[90,108],moderate:[108,125.99999999999999],vigorous:[125.99999999999999,153]}))
  it('requires a whole-number supported age',()=>expect(()=>heartRate(40.5)).toThrow())
  it('calculates waist-to-height ratio without converting to percent',()=>expect(waistHeight(80,175).ratio).toBeCloseTo(.4571428571,9))
  it('rejects incompatible-looking ranges',()=>expect(()=>waistHeight(0,175)).toThrow())
  it('applies the documented water planning heuristic',()=>expect(water(70,30).liters).toBeCloseTo(2.66,10))
  it('rejects unsupported water inputs',()=>expect(()=>water(70,-1)).toThrow())
  it('uses Mifflin–St Jeor for male and female terms',()=>{expect(bmr(70,175,30,'male').calories).toBe(1648.75);expect(bmr(70,175,30,'female').calories).toBe(1482.75)})
  it('rejects an unsupported equation sex term',()=>expect(()=>bmr(70,175,30,'other')).toThrow())
  it('applies only listed TDEE factors',()=>{expect(calories(1650,1.55).maintenance).toBe(2557.5);expect(()=>calories(1650,1.4)).toThrow()})
})
