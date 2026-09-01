const cdcBmi = { label: 'CDC — Adult BMI categories', url: 'https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html' }
const nistSi = { label: 'NIST Special Publication 811 — SI units', url: 'https://www.nist.gov/pml/special-publication-811' }

export const methodologySources = Object.freeze({
  bmi: [cdcBmi],
  'heart-rate': [{ label: 'Tanaka et al. — Age-predicted maximum heart rate', url: 'https://pubmed.ncbi.nlm.nih.gov/11153730/' }],
  'water-intake': [{ label: 'National Academies — Dietary Reference Intakes for Water', url: 'https://www.nationalacademies.org/projects/HMD-FNB-19-P-139/publication/10925' }],
  bmr: [{ label: 'Mifflin et al. — Resting energy expenditure equation', url: 'https://pubmed.ncbi.nlm.nih.gov/2305711/' }],
  'length-converter': [nistSi],
  'mass-converter': [nistSi],
  'temperature-converter': [nistSi, { label: 'NIST — SI unit of temperature', url: 'https://www.nist.gov/pml/owm/si-units-temperature' }],
  'area-converter': [nistSi],
  'volume-converter': [nistSi],
  'speed-converter': [nistSi],
  'data-converter': [{ label: 'IEC — Binary prefixes', url: 'https://www.iec.ch/prefixes-binary-multiples' }],
})
