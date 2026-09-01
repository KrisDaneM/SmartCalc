import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, LockKeyhole, Route, ShieldCheck } from 'lucide-react'
import SEO from '../components/SEO'
import CalculatorFinder from '../components/CalculatorFinder'
import { calculators, categories } from '../data/calculators'

const categoryLabels={health:'Health',finance:'Finance',math:'Math',time:'Time',conversion:'Conversion',everyday:'Everyday'}

function RecentTools(){
  const [recent]=useState(()=>{try{const paths=JSON.parse(localStorage.getItem('smartcalc-recent')||'[]');return paths.map(path=>calculators.find(tool=>tool.path===path)).filter(Boolean).slice(0,4)}catch{return[]}})
  if(!recent.length)return null
  return <div className="recent-tools"><span>Recently used</span>{recent.map(tool=><Link key={tool.id} to={tool.path}>{tool.name}</Link>)}</div>
}

export default function HomePage(){
  const popular=calculators.filter(tool=>tool.popular)
  const featured=popular.find(tool=>tool.id==='bmi')||popular[0]
  const supporting=['loan','percentage'].map(id=>calculators.find(tool=>tool.id===id)).filter(Boolean)
  const compact=popular.filter(tool=>tool.id!==featured.id&&!supporting.some(item=>item.id===tool.id))
  const FeaturedIcon=featured.icon
  return <>
    <SEO title="SmartCalc – Fast, Accurate Online Calculators" description="Free calculators for health, finance, math, time, conversions, and everyday life. Clear formulas, careful validation, and instant results."/>
    <section className="hero-section"><div className="hero-inner">
      <div className="hero-main"><span className="hero-index">SmartCalc / {calculators.length} focused tools</span><h1>Calculate what matters.</h1><p>One focused workspace for practical health, finance, math, time, and conversion tools.</p><CalculatorFinder/><nav className="hero-categories" aria-label="Calculator categories">{Object.keys(categories).map(key=><Link key={key} to={`/calculators?category=${key}`}>{categoryLabels[key]}<span aria-hidden="true">↗</span></Link>)}</nav><RecentTools/></div>
      <aside className="hero-workspace" aria-label="SmartCalc calculator preview"><div className="workspace-brand"><img src="/smlogo.png" alt="SmartCalc logo" width="64" height="61"/><div><strong>SmartCalc</strong><span>Calculator workspace</span></div></div><div className="workspace-rule"/><div className="workspace-title"><span>Preview / Health</span><h2>BMI Calculator</h2></div><dl><div><dt>Height</dt><dd>175 cm</dd></div><div><dt>Weight</dt><dd>70 kg</dd></div></dl><div className="workspace-result"><span>Calculated BMI</span><strong>22.9</strong><small><Check size={14}/> Normal range</small></div><Link to="/fitness/bmi">Open BMI Calculator <ArrowRight size={16}/></Link></aside>
    </div></section>
    <section className="section popular-section"><div className="section-heading editorial-heading"><span className="section-number">01</span><div><h2>Frequently used calculators</h2><p>Direct access to the tools people return to most.</p></div><Link to="/calculators">Full directory <ArrowRight size={16}/></Link></div><div className="popular-layout"><Link to={featured.path} className="featured-tool"><span>{categories[featured.category].name}</span><div><FeaturedIcon aria-hidden="true"/><h3>{featured.name}</h3><p>{featured.short}</p></div><strong>Open calculator <ArrowRight size={17}/></strong></Link><div className="supporting-tools">{supporting.map((tool,index)=>{const Icon=tool.icon;return <Link to={tool.path} key={tool.id}><span>0{index+2}</span><Icon aria-hidden="true"/><div><h3>{tool.name}</h3><p>{tool.short}</p></div><ArrowRight aria-hidden="true"/></Link>})}</div></div><div className="compact-tools">{compact.map((tool,index)=><Link to={tool.path} key={tool.id}><span>0{index+4}</span><strong>{tool.name}</strong><small>{categories[tool.category].name}</small><ArrowRight aria-hidden="true"/></Link>)}</div></section>
    <section className="category-section"><div className="section"><div className="section-heading editorial-heading"><span className="section-number">02</span><div><h2>Browse by discipline</h2><p>Six practical groups, organized for quick scanning.</p></div></div><div className="category-directory">{Object.entries(categories).map(([key,category],index)=>{const Icon=category.icon;const count=calculators.filter(tool=>tool.category===key).length;return <Link key={key} to={`/calculators?category=${key}`}><span className="category-order">{String(index+1).padStart(2,'0')}</span><Icon aria-hidden="true"/><span className="category-directory-copy"><strong>{category.name}</strong><small>{category.description}</small></span><span className="category-total">{count} tools</span><ArrowRight aria-hidden="true"/></Link>})}</div></div></section>
    <section className="section methodology-section"><div className="methodology-intro"><span className="section-number">03</span><h2>Clear methods.<br/>Useful context.</h2><p>SmartCalc separates calculation logic from presentation, validates inputs before computing, and explains assumptions where estimates depend on them.</p><Link to="/about">Read the methodology <ArrowRight size={16}/></Link></div><div className="methodology-points"><article><ShieldCheck/><div><h3>Reviewed formulas</h3><p>Established methods are documented and covered by focused calculation tests.</p></div></article><article><Route/><div><h3>Results with context</h3><p>Units, precision, limitations, and assumptions stay visible beside the result.</p></div></article><article><LockKeyhole/><div><h3>Browser-based by default</h3><p>Inputs are calculated locally. No account or data submission is required.</p></div></article></div></section>
    <section className="section steps"><div className="section-heading editorial-heading"><span className="section-number">04</span><div><h2>From question to result</h2><p>A straightforward three-step workflow.</p></div></div><ol><li><b>01</b><span><strong>Find a tool</strong>Search directly or browse a discipline.</span></li><li><b>02</b><span><strong>Enter the values</strong>Purpose-built fields validate the required inputs.</span></li><li><b>03</b><span><strong>Review the method</strong>Read the result alongside its formula and assumptions.</span></li></ol></section>
  </>
}
