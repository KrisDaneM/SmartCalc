import { describe, expect, it } from 'vitest'
import { fuelConsumption, weightedGpa, weightedGrade } from './everyday'

describe('fuel consumption',()=>{
  it('calculates distinct metric, US, and Imperial units',()=>{const result=fuelConsumption(100,8,1.5);expect(result.litersPer100Km).toBe(8);expect(result.kmPerLiter).toBe(12.5);expect(result.mpgUS).toBeCloseTo(29.40182291,7);expect(result.mpgImperial).toBeCloseTo(35.31011704,7);expect(result.cost).toBe(12)})
  it('rejects zero distance/fuel and negative price',()=>{expect(()=>fuelConsumption(0,8)).toThrow();expect(()=>fuelConsumption(100,0)).toThrow();expect(()=>fuelConsumption(100,8,-1)).toThrow()})
})
describe('education calculations',()=>{
  it('calculates credit-weighted GPA',()=>expect(weightedGpa('4,3.5,3','3,4,3',4)).toEqual({gpa:3.5,credits:10}))
  it('supports an explicit alternative scale',()=>expect(weightedGpa('5,4','1,1',5).gpa).toBe(4.5))
  it('rejects above-scale grades, blank tokens, and mismatched lists',()=>{expect(()=>weightedGpa('4.1','3',4)).toThrow();expect(()=>weightedGpa('4,,3','2,2,2',4)).toThrow();expect(()=>weightedGpa('4,3','2',4)).toThrow()})
  it('calculates weighted grade',()=>expect(weightedGrade('85,92,78','30,40,30').grade).toBeCloseTo(85.7,10))
  it('requires matching weights totaling 100%',()=>{expect(()=>weightedGrade('90,80','50,40')).toThrow();expect(()=>weightedGrade('90','101')).toThrow()})
})
