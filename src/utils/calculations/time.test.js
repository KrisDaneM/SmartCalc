import { describe, expect, it } from 'vitest'
import { ageOn, countdown, daysBetween, parseLocalDate, workHours } from './time'

describe('date-only calculations',()=>{
  it('validates local calendar dates',()=>{expect(parseLocalDate('2024-02-29').getDate()).toBe(29);expect(()=>parseLocalDate('2023-02-29')).toThrow()})
  it('returns zero for equal dates',()=>expect(daysBetween('2024-02-29','2024-02-29').days).toBe(0))
  it('handles leap years and year boundaries',()=>{expect(daysBetween('2024-02-28','2024-03-01').days).toBe(2);expect(daysBetween('2023-12-31','2024-01-01').days).toBe(1)})
  it('rejects reversed ranges',()=>expect(()=>daysBetween('2024-03-01','2024-02-28')).toThrow())
})
describe('calendar age',()=>{
  it('respects a birthday not yet reached',()=>expect(ageOn('2000-09-10','2026-09-01')).toMatchObject({years:25,months:11,days:22}))
  it('handles exact leap-day anniversary',()=>expect(ageOn('2000-02-29','2024-02-29')).toMatchObject({years:24,months:0,days:0}))
  it('clamps leap-day anniversary in a non-leap year',()=>expect(ageOn('2000-02-29','2023-02-28')).toMatchObject({years:23,months:0,days:0}))
  it('handles month-end borrowing correctly',()=>expect(ageOn('2024-01-31','2024-03-01')).toMatchObject({years:0,months:1,days:1}))
  it('rejects a reference before birth',()=>expect(()=>ageOn('2024-01-01','2023-12-31')).toThrow())
})
describe('countdown and work hours',()=>{
  it('decomposes a local timestamp difference',()=>expect(countdown('2026-09-02T02:30',new Date(2026,8,1,0,0,0))).toEqual({days:1,hours:2,minutes:30,seconds:0}))
  it('rejects past and malformed countdown targets',()=>{expect(()=>countdown('2026-08-31T23:59',new Date(2026,8,1))).toThrow();expect(()=>countdown('2026-09-02')).toThrow()})
  it('calculates same-day work and breaks',()=>expect(workHours('09:00','17:00',30)).toEqual({hours:7,minutes:30,decimal:7.5}))
  it('supports an overnight shift',()=>expect(workHours('22:00','06:00',0)).toEqual({hours:8,minutes:0,decimal:8}))
  it('rejects a break longer than the shift and invalid time',()=>{expect(()=>workHours('09:00','10:00',61)).toThrow();expect(()=>workHours('25:00','10:00',0)).toThrow()})
})
