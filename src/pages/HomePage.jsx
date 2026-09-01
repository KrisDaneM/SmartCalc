import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SEO from '../components/SEO'
import CalculatorFinder from '../components/CalculatorFinder'
import { calculators, categories } from '../data/calculators'

const categoryLabels={health:'Health',finance:'Finance',math:'Math',time:'Time',conversion:'Conversion',everyday:'Everyday'}

function RecentTools(){
  const [recent]=useState(()=>{try{const paths=JSON.parse(localStorage.getItem('smartcalc-recent')||'[]');return paths.map(path=>calculators.find(tool=>tool.path===path)).filter(Boolean).slice(0,4)}catch{return[]}})
  if(!recent.length)return null
  return <div className="recent-tools"><span>Recently used</span><span className="recent-links">{recent.map(tool=><Link key={tool.id} to={tool.path}>{tool.name}</Link>)}</span></div>
}

export default function HomePage(){
  const popular=calculators.filter(tool=>tool.popular)
  const quickIds=['bmi','loan','percentage','age']
  const quickTools=quickIds.map(id=>calculators.find(tool=>tool.id===id)).filter(Boolean)
  return <>
    <SEO title="SmartCalc – Fast, Accurate Online Calculators" description="Free calculators for health, finance, math, time, conversions, and everyday life. Clear formulas, careful validation, and instant results."/>

    <section className="hero-section"><div className="hero-inner">
      <div className="hero-main"><h1>Calculate what matters.</h1><p>Reliable everyday tools, organized around the questions you need to answer.</p><CalculatorFinder/><nav className="hero-categories" aria-label="Calculator categories">{Object.keys(categories).map(key=><Link key={key} to={`/calculators?category=${key}`}>{categoryLabels[key]}</Link>)}</nav><RecentTools/></div>
      <aside className="hero-tool-index" aria-label="Quick access calculators"><p>Quick access</p>{quickTools.map(tool=>{const Icon=tool.icon;return <Link key={tool.id} to={tool.path}><Icon aria-hidden="true"/><span><strong>{tool.name}</strong><small>{categories[tool.category].name}</small></span><ArrowRight aria-hidden="true"/></Link>})}</aside>
    </div></section>

    <section className="section utility-section"><header className="utility-heading"><div><h2>Popular calculators</h2><p>The most frequently used SmartCalc tools.</p></div><Link to="/calculators">View all calculators <ArrowRight size={16}/></Link></header><div className="popular-directory">{popular.map(tool=>{const Icon=tool.icon;return <Link key={tool.id} to={tool.path}><Icon aria-hidden="true"/><span><strong>{tool.name}</strong><small>{categories[tool.category].name}</small><p>{tool.short}</p></span><ArrowRight aria-hidden="true"/></Link>})}</div></section>

    <section className="category-section"><div className="section utility-section"><header className="utility-heading"><div><h2>Browse by category</h2><p>Find the right group, then choose a focused calculator.</p></div></header><div className="category-directory">{Object.entries(categories).map(([key,category])=>{const Icon=category.icon;const count=calculators.filter(tool=>tool.category===key).length;return <Link key={key} to={`/calculators?category=${key}`}><Icon aria-hidden="true"/><span className="category-directory-copy"><strong>{category.name}</strong><small>{category.description}</small></span><span className="category-total">{count} tools</span><ArrowRight aria-hidden="true"/></Link>})}</div></div></section>

    <section className="section methodology-section"><div className="methodology-intro"><h2>Transparent calculations,<br/>without unnecessary complexity.</h2><p>Methods, units, and assumptions stay close to each result, so you can understand what was calculated and where an estimate has limits.</p><Link to="/about">About our methodology <ArrowRight size={16}/></Link></div><div className="methodology-points"><article><div><h3>Reviewed formulas</h3><p>Documented calculation methods supported by focused test coverage.</p></div></article><article><div><h3>Clear assumptions</h3><p>Units, input limits, formulas, and relevant caveats are shown beside results.</p></div></article><article><div><h3>Local calculations</h3><p>Calculator inputs stay in your browser and require no account.</p></div></article></div></section>

    <section className="section steps"><header className="utility-heading"><div><h2>How SmartCalc works</h2></div></header><ol><li><b>01</b><span><strong>Find a calculator</strong>Search directly or browse by category.</span></li><li><b>02</b><span><strong>Enter your values</strong>Use the fields and units prepared for the calculation.</span></li><li><b>03</b><span><strong>Review the result</strong>See the answer with its method and assumptions.</span></li></ol></section>
  </>
}
