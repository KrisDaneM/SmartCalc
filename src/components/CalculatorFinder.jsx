import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Search } from 'lucide-react'
import { calculators, categories } from '../data/calculators'

export default function CalculatorFinder(){
  const [query,setQuery]=useState('')
  const [activeIndex,setActiveIndex]=useState(-1)
  const inputRef=useRef(null)
  const navigate=useNavigate()
  const matches=useMemo(()=>{
    const normalized=query.trim().toLowerCase()
    if(!normalized)return []
    return calculators.filter(tool=>`${tool.name} ${tool.short} ${categories[tool.category].name}`.toLowerCase().includes(normalized)).slice(0,6)
  },[query])

  useEffect(()=>{
    const focusSearch=event=>{
      const target=event.target
      if(event.key!=='/'||event.metaKey||event.ctrlKey||event.altKey||target instanceof HTMLInputElement||target instanceof HTMLTextAreaElement||target instanceof HTMLSelectElement||target?.isContentEditable)return
      event.preventDefault()
      inputRef.current?.focus()
    }
    window.addEventListener('keydown',focusSearch)
    return()=>window.removeEventListener('keydown',focusSearch)
  },[])

  const onKeyDown=event=>{
    if(event.key==='ArrowDown'&&matches.length){event.preventDefault();setActiveIndex(index=>(index+1)%matches.length)}
    if(event.key==='ArrowUp'&&matches.length){event.preventDefault();setActiveIndex(index=>(index-1+matches.length)%matches.length)}
    if(event.key==='Enter'&&activeIndex>=0&&matches[activeIndex]){event.preventDefault();navigate(matches[activeIndex].path)}
    if(event.key==='Escape'){setQuery('');setActiveIndex(-1);inputRef.current?.blur()}
  }

  return <div className="finder-wrap">
    <label className="hero-finder">
      <Search aria-hidden="true" size={21}/>
      <span className="sr-only">Search SmartCalc calculators</span>
      <input ref={inputRef} value={query} onChange={event=>{setQuery(event.target.value);setActiveIndex(0)}} onKeyDown={onKeyDown} placeholder="Search calculators" autoComplete="off" role="combobox" aria-expanded={matches.length>0} aria-controls="calculator-search-results" aria-activedescendant={activeIndex>=0?`calculator-result-${matches[activeIndex]?.id}`:undefined}/>
      <kbd aria-label="Keyboard shortcut: slash">/</kbd>
    </label>
    {query.trim()&&<div id="calculator-search-results" className="finder-results" role="listbox" aria-label="Calculator search results">
      {matches.length?matches.map((tool,index)=>{const Icon=tool.icon;return <Link id={`calculator-result-${tool.id}`} role="option" aria-selected={index===activeIndex} className={index===activeIndex?'active':''} key={tool.id} to={tool.path} onMouseEnter={()=>setActiveIndex(index)}>
        <Icon aria-hidden="true" size={18}/><span><strong>{tool.name}</strong><small>{categories[tool.category].name} · {tool.short}</small></span><ArrowRight aria-hidden="true" size={16}/>
      </Link>}):<p className="finder-empty">No calculator matches “{query.trim()}”.</p>}
    </div>}
  </div>
}
