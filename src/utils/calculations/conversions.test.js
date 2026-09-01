import { describe, expect, it } from 'vitest'
import { convert } from './conversions'

describe('authoritative unit conversions',()=>{
  it('uses exact inch and foot definitions',()=>{expect(convert(1,'in','cm','length').result).toBe(2.54);expect(convert(1,'ft','m','length').result).toBe(.3048)})
  it('uses exact pound and mile factors',()=>{expect(convert(1,'lb','kg','mass').result).toBe(.45359237);expect(convert(1,'mi','m','length').result).toBe(1609.344)})
  it('uses the defined US gallon factor',()=>expect(convert(1,'US gal','L','volume').result).toBe(3.785411784))
  it('converts area and speed',()=>{expect(convert(1,'ft²','m²','area').result).toBe(.09290304);expect(convert(36,'km/h','m/s','speed').result).toBe(10)})
  it('distinguishes decimal SI and binary IEC storage',()=>{expect(convert(1,'KB','B','data').result).toBe(1000);expect(convert(1,'KiB','B','data').result).toBe(1024);expect(convert(1,'MiB','MB','data').result).toBe(1.048576)})
  it('converts Celsius and Fahrenheit reference points',()=>{expect(convert(0,'C','F','temperature').result).toBe(32);expect(convert(100,'C','F','temperature').result).toBe(212)})
  it('enforces absolute zero',()=>{expect(convert(0,'K','C','temperature').result).toBe(-273.15);expect(()=>convert(-.01,'K','C','temperature')).toThrow()})
  it('round-trips temperature, length, and mass within display precision',()=>{const c=37.25;expect(convert(convert(c,'C','F','temperature').result,'F','C','temperature').result).toBeCloseTo(c,9);const kg=72.345;expect(convert(convert(kg,'kg','lb','mass').result,'lb','kg','mass').result).toBeCloseTo(kg,7);const m=123.456;expect(convert(convert(m,'m','ft','length').result,'ft','m','length').result).toBeCloseTo(m,7)})
  it('rejects invalid units and non-finite input',()=>{expect(()=>convert(1,'kg','m','mass')).toThrow();expect(()=>convert(Infinity,'kg','lb','mass')).toThrow()})
})
