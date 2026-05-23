import React, { useState } from 'react'
import { Lock, Mail, User, ArrowRight, Compass, ShieldAlert, Check } from 'lucide-react'

export default function AuthScreen({ onAuthSuccess, onBackToHome }) {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const host = window.location.hostname || 'localhost'
    const endpoint = isLogin ? '/api/login/' : '/api/register/'
    const url = `http://${host}:8000${endpoint}`

    const payload = isLogin 
      ? { username, password }
      : { username, email, password }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        setTimeout(() => {
          onAuthSuccess(data.token, data.user)
        }, 1000)
      } else {
        setError(data.error || data.non_field_errors?.[0] || 'Authentication failed. Please try again.')
      }
    } catch (err) {
      setError('Connection to backend failed. Make sure Django server is running.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-container animate-fade-in">
      <div className="auth-card glass">
        <div className="auth-header">
          <div className="auth-logo">
            <Compass size={28} className="pulse-glow" />
          </div>
          <h2>{isLogin ? 'Welcome Back' : 'Start Your Journey'}</h2>
          <p className="auth-subtitle">
            {isLogin 
              ? 'Log in to track progress and sync roadmaps to your profile.' 
              : 'Create a free student profile to unlock checklist persistence.'}
          </p>
        </div>

        {error && (
          <div className="auth-alert error">
            <ShieldAlert size={16} />
            <span>{error}</span>
          </div>
        )}

        {isSuccess && (
          <div className="auth-alert success">
            <Check size={16} />
            <span>Success! Redirecting...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-icon-wrapper">
              <User size={16} className="input-icon" />
              <input
                id="username"
                type="text"
                placeholder="e.g. techstudent"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading || isSuccess}
              />
            </div>
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-icon-wrapper">
                <Mail size={16} className="input-icon" />
                <input
                  id="email"
                  type="email"
                  placeholder="e.g. learner@pathcraft.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading || isSuccess}
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-icon-wrapper">
              <Lock size={16} className="input-icon" />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading || isSuccess}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-block" 
            disabled={isLoading || isSuccess}
          >
            {isLoading ? (
              <span className="spinner-small"></span>
            ) : (
              <>
                <span>{isLogin ? 'Sign In' : 'Sign Up'}</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <span>{isLogin ? "Don't have an account?" : 'Already registered?'}</span>
          <button 
            onClick={() => {
              setIsLogin(!isLogin)
              setError('')
            }}
            className="auth-toggle-btn"
            disabled={isLoading || isSuccess}
          >
            {isLogin ? 'Create Profile' : 'Sign In instead'}
          </button>
        </div>
        
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <button 
            onClick={onBackToHome} 
            className="btn btn-secondary"
            style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', borderRadius: '8px' }}
            disabled={isLoading || isSuccess}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}
