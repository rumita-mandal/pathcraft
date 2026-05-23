import React from 'react'
import { Code, Database, Server, Brain, Shield, Terminal, ArrowRight } from 'lucide-react'

// Helper to resolve icon from string
const getIcon = (iconName) => {
  switch (iconName) {
    case 'Code': return <Code size={24} />
    case 'Database': return <Database size={24} />
    case 'Server': return <Server size={24} />
    case 'Brain': return <Brain size={24} />
    case 'Shield': return <Shield size={24} />
    default: return <Terminal size={24} />
  }
}

// Resolve glass card glowing shadows based on career icon style
const getGlowClass = (iconName) => {
  switch (iconName) {
    case 'Code': return 'glass-glow-purple'
    case 'Database': return 'glass-glow-green'
    case 'Server': return 'glass-glow-blue'
    case 'Brain': return 'glass-glow-orange'
    case 'Shield': return 'glass-glow-red'
    default: return 'glass-glow-purple'
  }
}

export default function CareerCard({ career, onSelect }) {
  const icon = getIcon(career.icon)
  const glowClass = getGlowClass(career.icon)

  return (
    <div 
      className={`glass career-card ${glowClass} animate-fade-in`} 
      onClick={() => onSelect(career)}
      style={{ '--theme-gradient': career.theme_color, '--theme-color': career.theme_color?.includes('#') ? career.theme_color : '#6366f1' }}
    >
      <div>
        <div className="card-header">
          <div className="icon-wrapper">
            {icon}
          </div>
          <span className="card-nodes-badge">
            {career.node_count || 0} Steps
          </span>
        </div>

        <h3 className="card-title">{career.title}</h3>
        <p className="card-description">{career.description}</p>
      </div>

      <div className="card-footer">
        <span>Start Roadmap</span>
        <ArrowRight size={16} />
      </div>
    </div>
  )
}
