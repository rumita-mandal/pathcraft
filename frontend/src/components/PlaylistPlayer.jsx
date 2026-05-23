import React from 'react'
import { Play, Clock, ExternalLink, HelpCircle, AlertCircle } from 'lucide-react'

// Helper to extract playlist ID from standard youtube URL
const getEmbedUrl = (url) => {
  if (!url) return ''
  try {
    const urlObj = new URL(url)
    const playlistId = urlObj.searchParams.get('list')
    if (playlistId) {
      return `https://www.youtube.com/embed/videoseries?list=${playlistId}&rel=0`
    }
    // Fallback if URL is direct video link
    const videoId = urlObj.searchParams.get('v')
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?rel=0`
    }
  } catch (e) {
    console.error("Invalid URL passed to player", e)
  }
  return url
}

export default function PlaylistPlayer({ activeNode, activeResource }) {
  if (!activeNode) {
    return (
      <div className="glass terminal-view empty-state animate-fade-in">
        <HelpCircle size={48} className="pulse-glow" style={{ color: 'var(--accent)' }} />
        <h3>Learning Terminal Offline</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Select any milestone node on the roadmap to activate the video player and access curated learning playlists.
        </p>
      </div>
    )
  }

  const resource = activeResource || (activeNode.resources && activeNode.resources[0])
  const embedUrl = resource ? getEmbedUrl(resource.url) : ''

  return (
    <div className="glass terminal-view animate-fade-in" style={{ borderColor: 'rgba(99, 102, 241, 0.2)' }}>
      {/* Mac style terminal header */}
      <div className="terminal-header">
        <div style={{ display: 'flex', gap: '6px' }}>
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }}></span>
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }}></span>
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }}></span>
        </div>
        <div className="terminal-title" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'monospace', marginLeft: '1rem' }}>
          pathcraft_terminal ~ {activeNode.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}
        </div>
      </div>

      {embedUrl ? (
        <div className="video-container">
          <iframe
            src={embedUrl}
            title={resource?.title || "Educational Video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div className="video-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', gap: '1rem', padding: '2rem' }}>
          <AlertCircle size={32} style={{ color: 'var(--warning)' }} />
          <span style={{ fontSize: '0.9rem' }}>No Video Resource Configured for this step.</span>
        </div>
      )}

      {resource && (
        <div className="playlist-info-card">
          <div className="playlist-info-row">
            <span className="playlist-title">{resource.title}</span>
            <a 
              href={resource.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary"
              style={{ padding: '0.35rem 0.65rem', borderRadius: '6px', fontSize: '0.75rem', gap: '0.25rem' }}
            >
              Open on YT
              <ExternalLink size={12} />
            </a>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem' }}>
            {resource.duration && (
              <span className="playlist-meta" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem' }}>
                <Clock size={12} />
                Duration: {resource.duration}
              </span>
            )}
            <span className="playlist-meta" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem' }}>
              <Play size={12} />
              Platform: YouTube
            </span>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem', lineHeight: '1.5' }}>
            This curated playlist covers the core concepts of <strong>{activeNode.title}</strong> at a <strong>{activeNode.difficulty}</strong> level. Use the checkbox on the milestone node to mark your completion!
          </p>
        </div>
      )}
    </div>
  )
}
