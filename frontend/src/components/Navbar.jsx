import React from 'react'
import { Compass, Trophy, HelpCircle, Sun, Moon, LogIn, LogOut, Shield } from 'lucide-react'

export default function Navbar({ 
  onNavigate, 
  currentView, 
  completedCount, 
  totalCount, 
  theme, 
  onToggleTheme, 
  user, 
  onLogout 
}) {
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <nav className="navbar">
      <div className="nav-brand" onClick={() => onNavigate('home')}>
        <div className="nav-logo">
          <Compass size={22} className="pulse-glow" />
        </div>
        <span>PathCraft</span>
      </div>

      <div className="nav-links">
        <a 
          className={`nav-link ${currentView === 'home' ? 'gradient-text' : ''}`} 
          onClick={() => onNavigate('home')}
        >
          Explore Roads
        </a>
        <a 
          className={`nav-link ${currentView === 'quiz' ? 'gradient-text' : ''}`} 
          onClick={() => onNavigate('quiz')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <HelpCircle size={16} />
          Find My Path
        </a>
        
        {totalCount > 0 && (
          <div 
            className="glass" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              padding: '0.5rem 1rem', 
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 600,
              background: 'rgba(16, 185, 129, 0.05)',
              borderColor: 'rgba(16, 185, 129, 0.2)',
              color: '#10b981'
            }}
          >
            <Trophy size={16} />
            <span>Progress: {completedCount}/{totalCount} ({completionPercentage}%)</span>
          </div>
        )}
      </div>

      <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Sun/Moon Toggle Button */}
        <button 
          onClick={onToggleTheme} 
          className="btn btn-secondary" 
          style={{ padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* User Session Interface */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {user.is_staff && (
              <button 
                onClick={() => onNavigate('admin')}
                className="btn" 
                style={{ 
                  padding: '0.5rem 1rem', 
                  fontSize: '0.85rem', 
                  background: 'rgba(239, 68, 68, 0.1)', 
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  color: '#ef4444',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <Shield size={14} />
                <span>Admin Roster</span>
              </button>
            )}

            <div className="glass" style={{ padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: user.is_staff ? 'var(--danger)' : 'var(--success)' }}></div>
              <span style={{ fontWeight: 600 }}>{user.username}</span>
            </div>

            <button 
              onClick={onLogout} 
              className="btn btn-secondary"
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <button 
            onClick={() => onNavigate('auth')} 
            className="btn btn-primary"
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <LogIn size={15} />
            <span>Join/Login</span>
          </button>
        )}
      </div>
    </nav>
  )
}
