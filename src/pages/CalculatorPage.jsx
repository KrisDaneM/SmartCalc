import { useMemo, useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { AlertCircle, ArrowRight, RotateCcw } from 'lucide-react'
import SEO from '../components/SEO'
import { Field } from '../components/Fields'
import CalculatorCard from '../components/CalculatorCard'
import { calculatorByPath, calculators, getCategory } from '../data/calculators'

const initialValues=(tool)=>Object.fromEntries(tool.fields.map(f=>[f.name,typeof f.defaultValue==='function'?f.defaultValue():f.defaultValue??(f.type==='select'?f.options[0][0]:'')]))
function display(value,suffix,values){if(value===null)return'Not available';if(Array.isArray(value))return `${value[0]}–${value[1]}${suffix||''}`;if(typeof suffix==='function')return suffix(value,values);return `${value}${suffix||''}`}

export default function CalculatorPage(){
  const location=useLocation(),tool=calculatorByPath.get(location.pathname)
  const [values,setValues]=useState(()=>tool?initialValues(tool):{}),[result,setResult]=useState(null),[error,setError]=useState('')
  const related=useMemo(()=>tool?calculators.filter(x=>x.category===tool.category&&x.id!==tool.id).slice(0,3):[],[tool])
  if(!tool)return <Navigate to="/404" replace/>
  if(tool.legacy?.includes(location.pathname))return <Navigate to={tool.path} replace/>
  const change=(name,value)=>{setValues(v=>({...v,[name]:value}));setError('')}
  const submit=e=>{e.preventDefault();try{const output=tool.calculate(values);if(!output||Object.values(output).some(x=>typeof x==='number'&&!Number.isFinite(x)))throw Error('The result could not be calculated.');setResult(output);setError('')}catch(err){setResult(null);setError(err.message||'Check your inputs and try again.')}}
  const reset=()=>{setValues(initialValues(tool));setResult(null);setError('')}
  const category=getCategory(tool.category)
  return <div className="page-container calculator-page">
    <SEO title={`${tool.name} – Free Online Tool | SmartCalc`} description={`${tool.short} Free, private, and easy to use with clear formulas and validation.`} path={tool.path}/>
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to={`/calculators?category=${tool.category}`}>{category.name}</Link><span>/</span><span>{tool.name}</span></nav>
    <header className="calculator-header"><p className="kicker">{category.name}</p><h1>{tool.name}</h1><p>{tool.description}</p></header>
    <div className="calculator-workspace"><form className="calculator-form" onSubmit={submit} noValidate><div className="panel-heading"><h2>Your inputs</h2><p>Enter the values below. Your data stays in this browser.</p></div><div className="fields">{tool.fields.map(f=><Field key={f.name} field={f} value={values[f.name]} onChange={change}/>)}</div>{error&&<div className="error-message" role="alert"><AlertCircle size={18}/>{error}</div>}<div className="form-actions"><button className="button primary" type="submit">Calculate</button><button className="button ghost" type="button" onClick={reset}><RotateCcw size={17}/>Reset</button></div></form>
      <section className={`result-panel ${result?'has-result':''}`} aria-live="polite"><div><p className="result-label">Your result</p>{result?<div className="result-list">{tool.results.map(([label,key,suffix],i)=><div className={i===0?'primary-result':''} key={key}><span>{label}</span><strong>{display(result[key],suffix,values)}</strong></div>)}</div>:<div className="result-placeholder"><category.icon/><h2>Ready when you are</h2><p>Complete the form and select Calculate to see your result.</p></div>}</div>{tool.note&&<p className="result-note"><AlertCircle size={16}/>{tool.note}</p>}</section></div>
    <section className="content-grid"><article><p className="kicker">How it works</p><h2>Understanding this calculator</h2><p>{tool.description}</p><h3>Formula</h3><p>{tool.formula}</p><h3>Example</h3><p>{tool.example}</p></article><aside><h2>How to use it</h2><ol><li>Enter each requested value and choose the matching units.</li><li>Select <strong>Calculate</strong> to validate the inputs.</li><li>Review the primary result, supporting values, and assumptions.</li></ol></aside></section>
    {related.length>0&&<section className="related"><div className="section-heading"><div><p className="kicker">Keep calculating</p><h2>Related tools</h2></div><Link to={`/calculators?category=${tool.category}`}>See category <ArrowRight size={16}/></Link></div><div className="tool-grid">{related.map(x=><CalculatorCard key={x.id} calculator={x}/>)}</div></section>}
  </div>
}
