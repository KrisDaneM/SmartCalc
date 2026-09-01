import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Menu, Moon, Search, Sun, X } from 'lucide-react'
import { categories } from '../data/calculators'

const shortNames={health:'Health',finance:'Finance',math:'Math',time:'Time',conversion:'Conversion',everyday:'Everyday'}

function Brand(){return <Link to="/" className="brand" aria-label="SmartCalc home"><img src="/smlogo.png" alt="" width="34" height="33"/><span>Smart<span>Calc</span></span></Link>}

export default function Layout(){
  const [open,setOpen]=useState(false)
  const [dark,setDark]=useState(()=>{try{const saved=window.localStorage.getItem('smartcalc-theme');return saved?saved==='dark':true}catch{return true}})
  const location=useLocation()
  useEffect(()=>{document.documentElement.classList.toggle('dark',dark)},[dark])
  useEffect(()=>{if(!open)return;const close=event=>{if(event.key==='Escape')setOpen(false)};window.addEventListener('keydown',close);return()=>window.removeEventListener('keydown',close)},[open])
  const toggleTheme=()=>{const next=!dark;setDark(next);try{window.localStorage.setItem('smartcalc-theme',next?'dark':'light')}catch{/* Theme persistence is optional. */}}
  const currentCategory=new URLSearchParams(location.search).get('category')
  const isCategoryActive=key=>location.pathname==='/calculators'&&currentCategory===key
  const isDirectoryActive=location.pathname==='/calculators'&&!currentCategory

  return <div className="app-shell">
    <header className="topbar"><div className="topbar-inner"><Brand/><nav className="desktop-nav" aria-label="Primary navigation"><Link className={isDirectoryActive?'active':''} to="/calculators">All calculators</Link>{Object.keys(categories).map(key=><Link className={isCategoryActive(key)?'active':''} key={key} to={`/calculators?category=${key}`}>{shortNames[key]}</Link>)}</nav><div className="header-actions"><Link to="/calculators" className="icon-button" aria-label="Search calculators"><Search size={18}/></Link><button className="icon-button" onClick={toggleTheme} aria-label={`Switch to ${dark?'light':'dark'} mode`}>{dark?<Sun size={18}/>:<Moon size={18}/>}</button><button className="icon-button mobile-menu-button" onClick={()=>setOpen(value=>!value)} aria-label={open?'Close menu':'Open menu'} aria-expanded={open} aria-controls="mobile-navigation">{open?<X size={20}/>:<Menu size={20}/>}</button></div></div></header>
    {open&&<div className="drawer-layer" role="presentation" onMouseDown={()=>setOpen(false)}><aside id="mobile-navigation" className="drawer" role="dialog" aria-modal="true" aria-label="Mobile navigation" onMouseDown={event=>event.stopPropagation()}><div className="drawer-head"><Brand/><button className="icon-button" onClick={()=>setOpen(false)} aria-label="Close menu"><X size={20}/></button></div><nav onClick={()=>setOpen(false)}><Link className={isDirectoryActive?'active':''} to="/calculators">All calculators</Link>{Object.entries(categories).map(([key,category])=><Link className={isCategoryActive(key)?'active':''} key={key} to={`/calculators?category=${key}`}>{category.name}</Link>)}</nav></aside></div>}
    <main><Outlet/></main>
    <footer><div className="footer-grid"><div className="footer-brand"><Brand/><p>Reliable calculators for practical everyday questions.</p></div><nav aria-label="Footer navigation"><Link to="/calculators">All Calculators</Link><Link to="/about">Methodology</Link><Link to="/privacy">Privacy</Link></nav></div><div className="footer-bottom"><p>© {new Date().getFullYear()} SmartCalc</p><p>Results are informational estimates.</p></div></footer>
  </div>
}
