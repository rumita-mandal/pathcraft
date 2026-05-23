import React from 'react'
import { Check, Clock, PlayCircle, BookOpen } from 'lucide-react'

export default function RoadmapView({ 
  career, 
  nodes = [], 
  activeNode, 
  completedNodeIds = [], 
  onSelectNode, 
  onToggleComplete 
}) {
  if (!nodes || nodes.length === 0) {
    return (
      <div className="glass empty-state animate-fade-in">
        <BookOpen size={48} className="pulse-glow" style={{ color: 'var(--text-muted)' }} />
        <h3>Empty Roadmap Data</h3>
        <p style={{ color: 'var(--text-muted)' }}>
          Please make sure the backend database is seeded with career details.
        </p>
      </div>
    )
  }

  return (
    <div className="roadmap-container">
      {nodes.map((node) => {
        const isCompleted = completedNodeIds.includes(node.id)
        const isActive = activeNode?.id === node.id
        
        // Resolve badge style dynamically
        let badgeClass = 'badge-beginner'
        if (node.difficulty === 'Intermediate') badgeClass = 'badge-intermediate'
        else if (node.difficulty === 'Advanced') badgeClass = 'badge-advanced'

        return (
          <div 
            key={node.id} 
            className={`glass node-item ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''} animate-fade-in`}
            onClick={() => onSelectNode(node)}
            style={{ 
              borderColor: isActive ? 'var(--accent)' : 'var(--border-glass)',
              background: isActive ? 'rgba(255, 255, 255, 0.05)' : 'var(--bg-card)'
            }}
          >
            <div className="node-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {/* Custom node completion checkbox */}
                <div 
                  className={`node-checkbox ${isCompleted ? 'checked' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation() // Avoid activating the node selection when checking box
                    onToggleComplete(node.id)
                  }}
                >
                  {isCompleted && <Check size={14} strokeWidth={3} />}
                </div>
                <h4 className="node-title">{node.title}</h4>
              </div>

              <div className="node-meta">
                <span className={`badge ${badgeClass}`}>{node.difficulty}</span>
                {node.duration && (
                  <span className="node-duration">
                    <Clock size={12} />
                    {node.duration}
                  </span>
                )}
              </div>
            </div>

            <p className="node-description">{node.description}</p>
            
            {node.resources && node.resources.length > 0 && (
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.4rem', 
                  marginTop: '0.75rem', 
                  fontSize: '0.85rem',
                  color: 'var(--accent)',
                  fontWeight: 600
                }}
              >
                <PlayCircle size={14} />
                <span>{node.resources[0].title} ({node.resources[0].duration || 'Video Series'})</span>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
