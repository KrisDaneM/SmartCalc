import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { getCategory } from '../data/calculators'

export default function CalculatorCard({ calculator }) {
  const Icon=calculator.icon
  return <Link to={calculator.path} className="tool-card">
    <span className="tool-icon"><Icon size={21}/></span>
    <span className="min-w-0"><span className="tool-name">{calculator.name}</span><span className="tool-description">{calculator.short}</span><span className="tool-category">{getCategory(calculator.category).name}</span></span>
    <ArrowRight className="tool-arrow" size={18}/>
  </Link>
}
