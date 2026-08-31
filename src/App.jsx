import { Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import DirectoryPage from './pages/DirectoryPage'
import CalculatorPage from './pages/CalculatorPage'
import { About, NotFound, Privacy } from './pages/StaticPages'

function CalculatorRoute(){const location=useLocation();return <CalculatorPage key={location.pathname}/>}
export default function App(){return <Routes><Route element={<Layout/>}><Route index element={<HomePage/>}/><Route path="calculators" element={<DirectoryPage/>}/><Route path="about" element={<About/>}/><Route path="privacy" element={<Privacy/>}/><Route path="404" element={<NotFound/>}/><Route path="*" element={<CalculatorRoute/>}/></Route></Routes>}
