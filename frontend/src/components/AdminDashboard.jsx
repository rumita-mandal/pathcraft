import React, { useState, useEffect } from 'react'
import { Users, GraduationCap, Trophy, Search, ShieldAlert, RefreshCw, BarChart2 } from 'lucide-react'

export default function AdminDashboard({ token, onBackToHome }) {
  const [stats, setStats] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchStats = async () => {
    setIsLoading(true)
    setError('')
    const host = window.location.hostname || 'localhost'
    try {
      const response = await fetch(`http://${host}:8000/api/admin/stats/`, {
        headers: {
          'Authorization': `Token ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data)
      } else {
        const errData = await response.json()
        setError(errData.detail || 'Access denied. Only Django staff users can access this administrative view.')
      }
    } catch (err) {
      setError('Connection to admin database failed. Please verify that Django server is running.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [token])

  // Filter students roster by search
  const filteredStudents = stats?.students?.filter(s => 
    s.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  ) || []

  return (
    <div className="admin-dashboard-container animate-fade-in">
      <div className="admin-dashboard-header">
        <div>
          <div className="hero-tag" style={{ background: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }}>
            <Users size={14} />
            <span>Administrative Command Center</span>
          </div>
          <h1 className="admin-title">PathCraft Roster Portal</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.25rem' }}>
            Overview of student accounts, track enrollments, and aggregate curriculum milestone progress.
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={fetchStats} className="btn btn-secondary" style={{ padding: '0.6rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <RefreshCw size={16} className={isLoading ? 'spin-animation' : ''} />
            <span>Sync DB</span>
          </button>
          <button onClick={onBackToHome} className="btn btn-primary" style={{ padding: '0.6rem 1.25rem' }}>
            Exit Portal
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="empty-state" style={{ height: '400px' }}>
          <div className="spinner"></div>
          <p style={{ color: 'var(--text-muted)' }}>Retrieving administrative records...</p>
        </div>
      ) : error ? (
        <div className="glass error-card" style={{ maxWidth: '600px', margin: '3rem auto', padding: '3rem', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          <ShieldAlert size={50} style={{ color: 'var(--danger)', margin: '0 auto 1.5rem auto' }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Unauthorized Action</h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '2rem' }}>
            {error}
          </p>
          <button onClick={onBackToHome} className="btn btn-primary">Return to Explorer</button>
        </div>
      ) : stats ? (
        <div className="admin-grid animate-fade-in">
          {/* STATS OVERVIEW CARDS */}
          <div className="admin-metrics-row">
            <div className="glass metric-card">
              <div className="metric-header">
                <span>Total Registered Students</span>
                <Users size={20} style={{ color: 'var(--primary)' }} />
              </div>
              <div className="metric-value">{stats.total_students}</div>
              <p className="metric-desc">Count of accounts registered on the system</p>
            </div>

            <div className="glass metric-card">
              <div className="metric-header">
                <span>Active Track Enrollees</span>
                <GraduationCap size={20} style={{ color: 'var(--success)' }} />
              </div>
              <div className="metric-value">{stats.active_students}</div>
              <p className="metric-desc">Users actively checking off roadmaps nodes</p>
            </div>

            <div className="glass metric-card">
              <div className="metric-header">
                <span>Total Milestones Completed</span>
                <Trophy size={20} style={{ color: 'var(--warning)' }} />
              </div>
              <div className="metric-value">{stats.total_milestones_completed}</div>
              <p className="metric-desc">Interactive checkboxes registered in SQLite3</p>
            </div>
          </div>

          <div className="admin-split-portal">
            {/* LEFT COLUMN: Registered Student Directory */}
            <div className="glass admin-panel flex-column">
              <div className="panel-header">
                <h3>Registered Students Directory</h3>
                <div className="table-search-bar">
                  <Search size={16} />
                  <input 
                    type="text" 
                    placeholder="Search by student email or user..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Email</th>
                      <th>Joined Date</th>
                      <th>Milestones</th>
                      <th>Roster Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((student) => (
                        <tr key={student.id}>
                          <td style={{ fontWeight: 600 }}>{student.username}</td>
                          <td style={{ color: 'var(--text-muted)' }}>{student.email || 'N/A'}</td>
                          <td style={{ fontSize: '0.85rem' }}>{student.date_joined}</td>
                          <td>
                            <div className="badge badge-beginner" style={{ background: student.completed_count > 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.04)', color: student.completed_count > 0 ? 'var(--success)' : 'var(--text-muted)' }}>
                              {student.completed_count} Checked
                            </div>
                          </td>
                          <td>
                            {student.is_staff ? (
                              <span className="badge" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>Admin/Staff</span>
                            ) : (
                              <span className="badge" style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>Student</span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                          No students matched your search criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* RIGHT COLUMN: Course and Enrollment Metrics */}
            <div className="glass admin-panel">
              <div className="panel-header" style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <BarChart2 size={18} style={{ color: 'var(--primary)' }} />
                  <h3>Course Enrollment Metrics</h3>
                </div>
              </div>

              <div className="enrollment-list">
                {stats.careers?.map((career) => (
                  <div key={career.id} className="enrollment-card">
                    <div className="enrollment-card-top">
                      <div className="enrollment-name-section">
                        <div 
                          className="enrollment-icon-bubble" 
                          style={{ background: career.theme_color || 'var(--primary)', color: 'white' }}
                        >
                          <GraduationCap size={16} />
                        </div>
                        <div>
                          <h4>{career.title}</h4>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            {career.node_count} nodes in curriculum
                          </span>
                        </div>
                      </div>
                      <div className="enrollment-count-badge">
                        <span>{career.enrolled_students}</span>
                        <small>students</small>
                      </div>
                    </div>
                    
                    {/* Enrollment distribution bar */}
                    <div className="enrollment-bar-bg">
                      <div 
                        className="enrollment-bar-fill" 
                        style={{ 
                          width: `${stats.total_students > 0 ? (career.enrolled_students / stats.total_students) * 100 : 0}%`,
                          background: career.theme_color || 'var(--primary)'
                        }}
                      ></div>
                    </div>
                    <div className="enrollment-footer-desc">
                      <span>
                        {stats.total_students > 0 
                          ? `${Math.round((career.enrolled_students / stats.total_students) * 100)}%` 
                          : '0%'} of global userbase engaged on this path
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
