import { describe, expect, it } from 'vitest'
import { average, percentChange, percentage, percentageOperation, ratio } from './math'

describe('percentages',()=>{
  it('calculates 20% of 150',()=>expect(percentageOperation(20,150,'percentOf').result).toBe(30))
  it('calculates what percent a part is of a whole',()=>{expect(percentageOperation(30,150,'partOfWhole').result).toBe(20);expect(percentage(25,125).percent).toBe(20)})
  it('rejects zero whole and unknown operation',()=>{expect(()=>percentageOperation(1,0,'partOfWhole')).toThrow();expect(()=>percentageOperation(1,2,'unknown')).toThrow()})
  it('calculates positive, negative, and unchanged percentage change',()=>{expect(percentChange(100,120)).toEqual({change:20,direction:'increase'});expect(percentChange(100,80)).toEqual({change:-20,direction:'decrease'});expect(percentChange(100,100).direction).toBe('no change')})
  it('rejects conventional change from zero',()=>expect(()=>percentChange(0,10)).toThrow())
})
describe('descriptive math',()=>{
  it('retains zero and negative values in averages',()=>expect(average('-2, 0, 8, 10')).toEqual({average:4,median:4,count:4,sum:16,minimum:-2,maximum:10}))
  it('calculates odd-list median',()=>expect(average('1 9 3').median).toBe(3))
  it('rejects blank tokens and non-numbers',()=>{expect(()=>average('1,,2')).toThrow();expect(()=>average('1, x')).toThrow()})
  it('reduces integer ratios with GCD',()=>expect(ratio(12,18)).toEqual({ratio:'2:3',decimal:2/3}))
  it('handles zero ratio terms explicitly',()=>{expect(ratio(0,5)).toEqual({ratio:'0:1',decimal:0});expect(ratio(5,0)).toEqual({ratio:'1:0',decimal:null});expect(()=>ratio(0,0)).toThrow()})
  it('rejects non-integer ratios',()=>expect(()=>ratio(1.5,3)).toThrow())
})
