import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { Calculator, Menu, Moon, Search, Sun, X } from 'lucide-react'
import { categories } from '../data/calculators'

function Brand(){return <Link to="/" className="brand"><img src="/smlogo.png" alt=""/><span>SmartCalc</span></Link>}
export default function Layout(){
  const [open,setOpen]=useState(false)
  const [dark,setDark]=useState(()=>{try{const saved=window.localStorage.getItem('smartcalc-theme');return saved?saved==='dark':window.matchMedia?.('(prefers-color-scheme: dark)').matches??false}catch{return false}})
  useEffect(()=>{document.documentElement.classList.toggle('dark',dark)},[dark])
  const toggleTheme=()=>{const next=!dark;setDark(next);try{window.localStorage.setItem('smartcalc-theme',next?'dark':'light')}catch{/* Theme persistence is optional. */}}
  return <div className="app-shell">
    <header className="topbar"><div className="topbar-inner"><Brand/><nav className="desktop-nav" aria-label="Primary"><NavLink to="/calculators">All calculators</NavLink>{Object.entries(categories).slice(0,4).map(([key,c])=><NavLink key={key} to={`/calculators?category=${key}`}>{c.name.split(' & ')[0]}</NavLink>)}</nav><div className="header-actions"><Link to="/calculators" className="icon-button" aria-label="Search calculators"><Search size={19}/></Link><button className="icon-button" onClick={toggleTheme} aria-label={`Switch to ${dark?'light':'dark'} mode`}>{dark?<Sun size={19}/>:<Moon size={19}/>}</button><button className="icon-button mobile-menu-button" onClick={()=>setOpen(true)} aria-label="Open menu"><Menu size={21}/></button></div></div></header>
    {open&&<div className="drawer-layer" role="presentation" onMouseDown={()=>setOpen(false)}><aside className="drawer" role="dialog" aria-modal="true" aria-label="Navigation" onMouseDown={e=>e.stopPropagation()}><div className="drawer-head"><Brand/><button className="icon-button" onClick={()=>setOpen(false)} aria-label="Close menu"><X/></button></div><nav onClick={()=>setOpen(false)}><NavLink to="/calculators"><Calculator/>All calculators</NavLink>{Object.entries(categories).map(([key,c])=>{const Icon=c.icon;return <NavLink key={key} to={`/calculators?category=${key}`}><Icon/>{c.name}</NavLink>})}</nav></aside></div>}
    <main><Outlet/></main>
    <footer><div><Brand/><p>Fast, accurate calculators for everyday decisions.</p></div><nav aria-label="Footer"><Link to="/calculators">All calculators</Link><Link to="/about">About & methodology</Link><Link to="/privacy">Privacy</Link></nav><p>© {new Date().getFullYear()} SmartCalc. Results are informational estimates.</p></footer>
  </div>
}
