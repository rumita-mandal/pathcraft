import React, { useState, useEffect } from 'react'
import { ArrowLeft, BookOpen, Compass, Search, HelpCircle, AlertCircle } from 'lucide-react'
import Navbar from './components/Navbar'
import CareerCard from './components/CareerCard'
import RoadmapView from './components/RoadmapView'
import PlaylistPlayer from './components/PlaylistPlayer'
import QuizRecommender from './components/QuizRecommender'
import AuthScreen from './components/AuthScreen'
import AdminDashboard from './components/AdminDashboard'

// Hardcoded premium fallback mock data matching Django database seeds
// This guarantees the frontend remains 100% operational out-of-the-box!
const MOCK_CAREERS = [
  {
    id: 101,
    title: "Frontend Developer",
    slug: "frontend-developer",
    description: "Master the art of crafting beautiful, interactive, and responsive user interfaces. Translate design concepts into live, functional web experiences using HTML, CSS, JavaScript, and React.",
    icon: "Code",
    theme_color: "linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)",
    node_count: 6,
    nodes: [
      {
        id: 1001,
        title: "Internet & Web Fundamentals",
        description: "Understand how the internet works, what HTTP/HTTPS is, hosting, DNS, and browser rendering. Then, master the structural foundation of the web with semantic HTML5 and styling layouts with modern CSS3 (Flexbox, Grid, Custom Properties).",
        order: 1,
        difficulty: "Beginner",
        duration: "1-2 weeks",
        resources: [
          {
            id: 2001,
            title: "HTML & CSS Tutorial for Beginners",
            url: "https://www.youtube.com/playlist?list=PL4Gr5tOAP1tbBsnJgB5L6_l63H1vS9168",
            resource_type: "youtube_playlist",
            duration: "6 hours"
          }
        ]
      },
      {
        id: 1002,
        title: "JavaScript Essentials",
        description: "Learn the core scripting language of the web. Focus on variables, data types, control structures, functions, DOM manipulation, events, asynchronous programming (Promises, async/await), and modern ES6+ features.",
        order: 2,
        difficulty: "Beginner",
        duration: "2-3 weeks",
        resources: [
          {
            id: 2002,
            title: "JavaScript Tutorial for Beginners",
            url: "https://www.youtube.com/playlist?list=PLTjRvDozrdlxEIuOBZkMAK5ui56YfSZhy",
            resource_type: "youtube_playlist",
            duration: "14 hours"
          }
        ]
      },
      {
        id: 1003,
        title: "Git & Version Control",
        description: "Master version control to track project history, collaborate with other developers via GitHub, resolve merge conflicts, and manage feature branching and pull requests.",
        order: 3,
        difficulty: "Beginner",
        duration: "1 week",
        resources: [
          {
            id: 2003,
            title: "Git and GitHub Crash Course",
            url: "https://www.youtube.com/playlist?list=PL82C6-O45EGFs586_Rz8jQJp5ZcKzD4sD",
            resource_type: "youtube_playlist",
            duration: "3 hours"
          }
        ]
      },
      {
        id: 1004,
        title: "React.js Framework",
        description: "Dive into the most popular component-based UI library. Master JSX, components (props, state), hooks (useState, useEffect, useContext), dynamic routing, and handling API integration.",
        order: 4,
        difficulty: "Intermediate",
        duration: "3-4 weeks",
        resources: [
          {
            id: 2004,
            title: "ReactJS Course for Beginners",
            url: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISMCGpG5d",
            resource_type: "youtube_playlist",
            duration: "8 hours"
          }
        ]
      },
      {
        id: 1005,
        title: "Tailwind CSS & Styling Systems",
        description: "Learn how to build production-ready layouts with hyper-speed using utility-first styling. Build consistent design tokens, dark themes, and responsive design natively.",
        order: 5,
        difficulty: "Intermediate",
        duration: "1 week",
        resources: [
          {
            id: 2005,
            title: "Tailwind CSS Course",
            url: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9gpXORlEHliQsNyslK8y16v",
            resource_type: "youtube_playlist",
            duration: "4 hours"
          }
        ]
      },
      {
        id: 1006,
        title: "Build Tools & Web Performance",
        description: "Explore compilation, bundling, and hot reloading using Vite and npm packages. Learn optimization strategies like lazy loading, image compressing, and network request reductions.",
        order: 6,
        difficulty: "Advanced",
        duration: "2 weeks",
        resources: [
          {
            id: 2006,
            title: "Vite & Modern Frontend Tooling",
            url: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9h2HlFfM5o4p7X1s8-o-j6s",
            resource_type: "youtube_playlist",
            duration: "3 hours"
          }
        ]
      }
    ]
  },
  {
    id: 102,
    title: "Backend Developer",
    slug: "backend-developer",
    description: "Construct the engine that powers modern applications. Design database architectures, engineer secure high-performance REST APIs, build robust caching mechanisms, and deploy servers to the cloud.",
    icon: "Database",
    theme_color: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    node_count: 5,
    nodes: [
      {
        id: 1011,
        title: "Python & Backend Fundamentals",
        description: "Learn a robust programming language used in backend architectures. Master OOP, basic algorithms, package managers (pip/uv), data structures, and file systems.",
        order: 1,
        difficulty: "Beginner",
        duration: "2-3 weeks",
        resources: [
          {
            id: 2011,
            title: "Python Programming Course",
            url: "https://www.youtube.com/playlist?list=PLTjRvDozrdlxj5wgH4qkvwSOdHLOCx10f",
            resource_type: "youtube_playlist",
            duration: "12 hours"
          }
        ]
      },
      {
        id: 1012,
        title: "Relational Databases & SQL",
        description: "Understand how structured data is stored, indexed, and retrieved. Learn standard SQL queries, schemas, keys, constraints, table joints, and basic optimization tricks with SQLite or PostgreSQL.",
        order: 2,
        difficulty: "Beginner",
        duration: "2 weeks",
        resources: [
          {
            id: 2012,
            title: "SQL and Database Design Course",
            url: "https://www.youtube.com/playlist?list=PL0gIV7t4l35LoW012S4k85x_b_8Z3E-j9",
            resource_type: "youtube_playlist",
            duration: "5 hours"
          }
        ]
      },
      {
        id: 1013,
        title: "Django & Web Frameworks",
        description: "Learn a powerful batteries-included framework. Master Model-View-Template pattern, migrations, the Django ORM, authentication, admin panel, and template engines.",
        order: 3,
        difficulty: "Intermediate",
        duration: "3 weeks",
        resources: [
          {
            id: 2013,
            title: "Django Tutorial for Beginners",
            url: "https://www.youtube.com/playlist?list=PL-51W-CZuUglxqL2T_XhZ9k5b45gXfKjA",
            resource_type: "youtube_playlist",
            duration: "10 hours"
          }
        ]
      },
      {
        id: 1014,
        title: "RESTful API Engineering",
        description: "Master REST architecture, HTTP methods, headers, status codes, serialization, JWT authentication, and pagination using the Django REST Framework (DRF).",
        order: 4,
        difficulty: "Intermediate",
        duration: "2 weeks",
        resources: [
          {
            id: 2014,
            title: "Django REST Framework Course",
            url: "https://www.youtube.com/playlist?list=PL-51W-CZuUglFk4O5k0Vz4QdFf9bOa_L3",
            resource_type: "youtube_playlist",
            duration: "8 hours"
          }
        ]
      },
      {
        id: 1015,
        title: "Caching & Message Queues",
        description: "Drastically speed up API response times by setting up Redis caching. Manage complex asynchronous tasks in the background using Celery and message brokers.",
        order: 5,
        difficulty: "Advanced",
        duration: "2 weeks",
        resources: [
          {
            id: 2015,
            title: "Redis & Caching Architectures",
            url: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9hHG1Kk2Wd03Hsd_CAnPsmc",
            resource_type: "youtube_playlist",
            duration: "4 hours"
          }
        ]
      }
    ]
  },
  {
    id: 103,
    title: "DevOps Engineer",
    slug: "devops-engineer",
    description: "Bridge the gap between coding and production. Automate deployments, construct rapid CI/CD build channels, orchestrate cloud infrastructure, and supervise application health at scale.",
    icon: "Server",
    theme_color: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
    node_count: 4,
    nodes: [
      {
        id: 1021,
        title: "Linux Administration & Terminal",
        description: "Master the Linux command line (CLI), filesystems, user permissions, networking tools, process management, and simple shell/Bash scripting for automated tasks.",
        order: 1,
        difficulty: "Beginner",
        duration: "2 weeks",
        resources: [
          {
            id: 2021,
            title: "Linux CLI Course for Beginners",
            url: "https://www.youtube.com/playlist?list=PLtK75qoxnQOS7K_0Xn425E4wL5E05u5hU",
            resource_type: "youtube_playlist",
            duration: "6 hours"
          }
        ]
      },
      {
        id: 1022,
        title: "Docker Containers & Packaging",
        description: "Understand microservice containerization. Learn Dockerfiles, image building, registry pushes, networking, volumes, and orchestrating multiple services with Docker Compose.",
        order: 2,
        difficulty: "Intermediate",
        duration: "2 weeks",
        resources: [
          {
            id: 2022,
            title: "Docker and Containers Course",
            url: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9hxjeJoVdi4e4V8fPZ98n4G",
            resource_type: "youtube_playlist",
            duration: "5 hours"
          }
        ]
      },
      {
        id: 1023,
        title: "CI/CD & GitHub Actions Automation",
        description: "Automate tests, build validation, and deployments. Write custom YAML workflows to run linters, trigger containers, and deliver clean code continuously.",
        order: 3,
        difficulty: "Intermediate",
        duration: "2 weeks",
        resources: [
          {
            id: 2023,
            title: "GitHub Actions CI/CD Playlist",
            url: "https://www.youtube.com/playlist?list=PLN3n1USn4xNy6e8Z515s1203gVw9V1dPy",
            resource_type: "youtube_playlist",
            duration: "4 hours"
          }
        ]
      },
      {
        id: 1024,
        title: "Kubernetes Container Orchestration",
        description: "Manage thousands of containers. Understand clusters, pods, services, deployments, ingress, configmaps, persistent volumes, and scaling systems dynamically.",
        order: 4,
        difficulty: "Advanced",
        duration: "4 weeks",
        resources: [
          {
            id: 2024,
            title: "Kubernetes Complete Guide",
            url: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9j0pEs871KjGpH24_U-fbaO",
            resource_type: "youtube_playlist",
            duration: "10 hours"
          }
        ]
      }
    ]
  },
  {
    id: 104,
    title: "Data Scientist & AI Engineer",
    slug: "data-scientist-ai-engineer",
    description: "Uncover secret insights from massive raw data. Build statistical models, engineer machine learning pipelines, train deep learning networks, and deploy AI products that think.",
    icon: "Brain",
    theme_color: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
    node_count: 4,
    nodes: [
      {
        id: 1031,
        title: "Python for Data Analysis",
        description: "Start with core data science libraries: NumPy for numerical data arrays, Pandas for database table manipulation, and Matplotlib/Seaborn for advanced data visualizations.",
        order: 1,
        difficulty: "Beginner",
        duration: "2 weeks",
        resources: [
          {
            id: 2031,
            title: "Python for Data Analysis Course",
            url: "https://www.youtube.com/playlist?list=PL-osiE80TeTsWmV9i9c58mdDCSskIFdDS",
            resource_type: "youtube_playlist",
            duration: "7 hours"
          }
        ]
      },
      {
        id: 1032,
        title: "Data Preprocessing & Math",
        description: "Learn the vital mathematical pillars: Linear Algebra, Calculus, and Probability. Clean missing records, standardize features, and prepare clean dataset inputs.",
        order: 2,
        difficulty: "Beginner",
        duration: "3 weeks",
        resources: [
          {
            id: 2032,
            title: "Data Preprocessing & Mathematics",
            url: "https://www.youtube.com/playlist?list=PLZoTAELRMXVN7QGpcuN-VgqyTuAEz-T8H",
            resource_type: "youtube_playlist",
            duration: "8 hours"
          }
        ]
      },
      {
        id: 1033,
        title: "Machine Learning (Scikit-Learn)",
        description: "Master classic ML algorithms. Train Regression, Classification, Support Vector Machines, Random Forests, Decision Trees, K-Means Clustering, and assess precision/recall scores.",
        order: 3,
        difficulty: "Intermediate",
        duration: "4 weeks",
        resources: [
          {
            id: 2033,
            title: "Machine Learning Course with Python",
            url: "https://www.youtube.com/playlist?list=PLZoTAELRMXVMdJ5hp24O_tIzrxuVdK4H-",
            resource_type: "youtube_playlist",
            duration: "15 hours"
          }
        ]
      },
      {
        id: 1034,
        title: "Deep Learning & Neural Networks",
        description: "Dive into Artificial Neural Networks (ANNs), CNNs for computer vision, RNNs/Transformers for NLP, using popular frameworks like PyTorch or TensorFlow.",
        order: 4,
        difficulty: "Advanced",
        duration: "4 weeks",
        resources: [
          {
            id: 2034,
            title: "Deep Learning & PyTorch Course",
            url: "https://www.youtube.com/playlist?list=PLZoTAELRMXVPGU70ZGsckrMdr0FmlNJNy",
            resource_type: "youtube_playlist",
            duration: "12 hours"
          }
        ]
      }
    ]
  },
  {
    id: 105,
    title: "Cybersecurity Specialist",
    slug: "cybersecurity-specialist",
    description: "Guard the digital frontier. Audit systems, simulate advanced penetration hacking threats, configure robust defense networks, and dissect malicious software to secure business data.",
    icon: "Shield",
    theme_color: "linear-gradient(135deg, #ef4444 0%, #991b1b 100%)",
    node_count: 3,
    nodes: [
      {
        id: 1041,
        title: "Computer Networking & Protocols",
        description: "Understand core digital transport. Master the OSI Model, TCP/IP protocols, DNS operations, Subnetting, IP routing, Ports, and diagnosing packets via Wireshark.",
        order: 1,
        difficulty: "Beginner",
        duration: "3 weeks",
        resources: [
          {
            id: 2041,
            title: "CompTIA Network+ Tutorial",
            url: "https://www.youtube.com/playlist?list=PLG49S3nxzAnlGHY8h2ghFgIqNhHQCl5pG",
            resource_type: "youtube_playlist",
            duration: "14 hours"
          }
        ]
      },
      {
        id: 1042,
        title: "Kali Linux & Security Basics",
        description: "Get comfortable inside standard penetration distributions. Master user permissions, CLI commands, port scanning, firewalls, and cryptographic basics (symmetric/asymmetric encryption).",
        order: 2,
        difficulty: "Beginner",
        duration: "2 weeks",
        resources: [
          {
            id: 2042,
            title: "Linux for Hackers & Security",
            url: "https://www.youtube.com/playlist?list=PLBf0hzazHTGM8V_GfQDkSkf-3lB3oG1dF",
            resource_type: "youtube_playlist",
            duration: "6 hours"
          }
        ]
      },
      {
        id: 1043,
        title: "Ethical Hacking & Penetration Testing",
        description: "Learn standard auditing methodologies. Scan networks with Nmap, test web vulnerabilities (SQL Injection, XSS), abuse privilege escalation, and operate Metasploit safely.",
        order: 3,
        difficulty: "Intermediate",
        duration: "4 weeks",
        resources: [
          {
            id: 2043,
            title: "Ethical Hacking & PenTesting Course",
            url: "https://www.youtube.com/playlist?list=PLBf0hzazHTGN_1EaRymMh-V8M9kXyQSiA",
            resource_type: "youtube_playlist",
            duration: "16 hours"
          }
        ]
      }
    ]
  }
]

export default function App() {
  const [view, setView] = useState('home') // 'home' | 'quiz' | 'roadmap' | 'auth' | 'admin'
  const [careers, setCareers] = useState(MOCK_CAREERS)
  const [selectedCareer, setSelectedCareer] = useState(null)
  const [activeNode, setActiveNode] = useState(null)
  const [completedNodeIds, setCompletedNodeIds] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [apiOnline, setApiOnline] = useState(false)
  
  // Authentication & Theme States
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [theme, setTheme] = useState('dark')

  // Fetch career roadmaps from Django backend on mount
  useEffect(() => {
    const fetchCareers = async () => {
      setIsLoading(true)
      const baseUrl = import.meta.env.VITE_API_URL || `http://${window.location.hostname || 'localhost'}:8000/api`
      try {
        const response = await fetch(`${baseUrl}/careers/`)
        if (response.ok) {
          const data = await response.json()
          if (data && data.length > 0) {
            setCareers(data)
            setApiOnline(true)
          }
        }
      } catch (err) {
        console.warn("Backend server offline. Running PathCraft in local standalone mode with pre-loaded educational content.")
      } finally {
        setIsLoading(false)
      }
    }
    fetchCareers()
  }, [])

  // Load theme and session settings on mount
  useEffect(() => {
    // 1. Theme Configuration
    const savedTheme = localStorage.getItem('pathcraft_theme') || 'dark'
    setTheme(savedTheme)
    if (savedTheme === 'light') {
      document.body.classList.add('theme-light')
    } else {
      document.body.classList.remove('theme-light')
    }

    // 2. User Session & Progress Configuration
    const savedToken = localStorage.getItem('pathcraft_token')
    const savedUser = localStorage.getItem('pathcraft_user')
    if (savedToken && savedUser) {
      const parsedUser = JSON.parse(savedUser)
      setToken(savedToken)
      setUser(parsedUser)
      fetchUserProgress(savedToken)
    } else {
      // Local fallback for guest user progress
      try {
        const savedProgress = localStorage.getItem('pathcraft_completed_nodes')
        if (savedProgress) {
          setCompletedNodeIds(JSON.parse(savedProgress))
        }
      } catch (e) {
        console.error("Could not parse saved local nodes progress", e)
      }
    }
  }, [])

  const fetchUserProgress = async (authToken) => {
    const baseUrl = import.meta.env.VITE_API_URL || `http://${window.location.hostname || 'localhost'}:8000/api`
    try {
      const response = await fetch(`${baseUrl}/progress/`, {
        headers: {
          'Authorization': `Token ${authToken}`
        }
      })
      if (response.ok) {
        const completedIds = await response.json()
        setCompletedNodeIds(completedIds)
        localStorage.setItem('pathcraft_completed_nodes', JSON.stringify(completedIds))
      }
    } catch (err) {
      console.error("Failed to fetch user progress from DB", err)
    }
  }

  const handleToggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('pathcraft_theme', newTheme)
    if (newTheme === 'light') {
      document.body.classList.add('theme-light')
    } else {
      document.body.classList.remove('theme-light')
    }
  }

  const handleAuthSuccess = (newToken, newUser) => {
    setToken(newToken)
    setUser(newUser)
    localStorage.setItem('pathcraft_token', newToken)
    localStorage.setItem('pathcraft_user', JSON.stringify(newUser))
    
    // Sync guest achievements to Django DB on login/signup!
    const localProgress = localStorage.getItem('pathcraft_completed_nodes')
    if (localProgress) {
      try {
        const ids = JSON.parse(localProgress)
        // Fire sync commands in the background
        ids.forEach(async (nodeId) => {
          const baseUrl = import.meta.env.VITE_API_URL || `http://${window.location.hostname || 'localhost'}:8000/api`
          try {
            await fetch(`${baseUrl}/progress/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${newToken}`
              },
              body: JSON.stringify({ node_id: nodeId })
            })
          } catch (err) {
            console.error("Error bulk syncing node to server", nodeId, err)
          }
        })
      } catch (e) {
        console.error("Could not bulk sync guest items", e)
      }
    }
    
    setView('home')
    fetchUserProgress(newToken)
  }

  const handleLogout = () => {
    setToken(null)
    setUser(null)
    setCompletedNodeIds([])
    localStorage.removeItem('pathcraft_token')
    localStorage.removeItem('pathcraft_user')
    localStorage.removeItem('pathcraft_completed_nodes')
    setView('home')
  }

  // Fetch complete career detail (including nodes & resources) when selected
  const handleSelectCareer = async (career) => {
    setIsLoading(true)
    const baseUrl = import.meta.env.VITE_API_URL || `http://${window.location.hostname || 'localhost'}:8000/api`
    try {
      const response = await fetch(`${baseUrl}/careers/${career.slug}/`)
      if (response.ok) {
        const fullDetail = await response.json()
        setSelectedCareer(fullDetail)
        setActiveNode(fullDetail.nodes?.[0] || null)
      } else {
        // Fallback to mock item
        const mockItem = MOCK_CAREERS.find(c => c.slug === career.slug) || career
        setSelectedCareer(mockItem)
        setActiveNode(mockItem.nodes?.[0] || null)
      }
    } catch (err) {
      // Fallback to mock item
      const mockItem = MOCK_CAREERS.find(c => c.slug === career.slug) || career
      setSelectedCareer(mockItem)
      setActiveNode(mockItem.nodes?.[0] || null)
    } finally {
      setIsLoading(false)
      setView('roadmap')
    }
  }

  // Toggle checklist node completion status
  const handleToggleComplete = async (nodeId) => {
    let updated
    if (completedNodeIds.includes(nodeId)) {
      updated = completedNodeIds.filter(id => id !== nodeId)
    } else {
      updated = [...completedNodeIds, nodeId]
    }
    setCompletedNodeIds(updated)
    localStorage.setItem('pathcraft_completed_nodes', JSON.stringify(updated))

    // Secure sync toggle check to Django REST backend if authorized
    if (token) {
      const baseUrl = import.meta.env.VITE_API_URL || `http://${window.location.hostname || 'localhost'}:8000/api`
      try {
        await fetch(`${baseUrl}/progress/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          },
          body: JSON.stringify({ node_id: nodeId })
        })
      } catch (err) {
        console.warn("Offline or failed sync to Django. Locally updated.")
      }
    }
  }

  const handleNavigate = (destination) => {
    setView(destination)
    if (destination === 'home') {
      setSelectedCareer(null)
      setActiveNode(null)
    }
  }

  // Calculate global completed node progress counts
  // Sum up all nodes that are currently completed by user
  const allSeededNodes = careers.reduce((acc, current) => {
    const list = current.nodes || []
    return [...acc, ...list]
  }, [])
  const totalSeededNodeCount = allSeededNodes.length || MOCK_CAREERS.reduce((a, c) => a + (c.nodes?.length || 0), 0)
  
  // Filter careers list based on active typing query
  const filteredCareers = careers.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="app-container">
      <Navbar 
        onNavigate={handleNavigate} 
        currentView={view} 
        completedCount={completedNodeIds.length} 
        totalCount={totalSeededNodeCount}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        user={user}
        onLogout={handleLogout}
      />

      <main className="main-content">
        
        {/* VIEW 1: HOME PAGE */}
        {view === 'home' && (
          <div>
            <div className="hero-section">
              <div className="hero-tag">
                <Compass size={14} />
                <span>Modern Career Explorer Platform</span>
              </div>
              <h1 className="hero-title">Craft Your Learning Journey</h1>
              <p className="hero-subtitle">
                Don't guess where to start. We map out premium interactive roadmaps complete with best-in-class curated YouTube playlists to transition you into tech effortlessly.
              </p>
              
              <div className="hero-actions">
                <button onClick={() => setView('quiz')} className="btn btn-primary">
                  Find My Perfect Path
                </button>
                {apiOnline && (
                  <div 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.4rem', 
                      fontSize: '0.8rem',
                      color: 'var(--success)',
                      fontWeight: 600,
                      alignSelf: 'center',
                      padding: '0.5rem 1rem',
                      background: 'rgba(16, 185, 129, 0.05)',
                      borderRadius: '10px',
                      border: '1px solid rgba(16, 185, 129, 0.2)'
                    }}
                  >
                    <AlertCircle size={14} />
                    <span>Django DB API Online</span>
                  </div>
                )}
              </div>
            </div>

            {/* Search filter bar */}
            <div 
              className="glass" 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                padding: '0.75rem 1.25rem', 
                maxWidth: '500px', 
                margin: '0 auto 3rem auto',
                borderRadius: '12px'
              }}
            >
              <Search size={18} style={{ color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search tech careers (e.g. DevOps, React, Python)..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  outline: 'none', 
                  color: 'white', 
                  width: '100%',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem'
                }}
              />
            </div>

            {isLoading ? (
              <div className="empty-state">
                <div className="spinner"></div>
                <p style={{ color: 'var(--text-muted)' }}>Loading career path details...</p>
              </div>
            ) : filteredCareers.length > 0 ? (
              <div className="careers-grid">
                {filteredCareers.map((c) => (
                  <CareerCard key={c.id} career={c} onSelect={handleSelectCareer} />
                ))}
              </div>
            ) : (
              <div className="glass empty-state" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <AlertCircle size={40} style={{ color: 'var(--text-muted)' }} />
                <h3>No Careers Match "{searchQuery}"</h3>
                <p style={{ color: 'var(--text-muted)' }}>Try searching for standard roles like Frontend, Backend, DevOps, or ML.</p>
                <button onClick={() => setSearchQuery('')} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>Clear Query</button>
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: QUIZ COMPONENT */}
        {view === 'quiz' && (
          <QuizRecommender careers={careers} onSelectCareer={handleSelectCareer} />
        )}

        {/* VIEW 3: INTERACTIVE ROADMAP SPLIT SCREEN */}
        {view === 'roadmap' && selectedCareer && (
          <div className="detail-view">
            <div className="detail-header">
              <button onClick={() => handleNavigate('home')} className="back-btn">
                <ArrowLeft size={18} />
              </button>
              <div className="detail-title-section">
                <div 
                  className="icon-wrapper" 
                  style={{ 
                    background: selectedCareer.theme_color, 
                    color: 'white',
                    boxShadow: '0 4px 15px rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <BookOpen size={20} />
                </div>
                <div>
                  <h2 className="detail-title">{selectedCareer.title} Roadmap</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
                    {selectedCareer.description}
                  </p>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="empty-state">
                <div className="spinner"></div>
                <p style={{ color: 'var(--text-muted)' }}>Retrieving detailed milestones...</p>
              </div>
            ) : (
              <div className="split-layout">
                {/* Left side: chronological road nodes */}
                <RoadmapView 
                  career={selectedCareer}
                  nodes={selectedCareer.nodes}
                  activeNode={activeNode}
                  completedNodeIds={completedNodeIds}
                  onSelectNode={(node) => setActiveNode(node)}
                  onToggleComplete={handleToggleComplete}
                />

                {/* Right side: embedded playlist terminal viewer */}
                <PlaylistPlayer 
                  activeNode={activeNode}
                  activeResource={activeNode?.resources?.[0]}
                />
              </div>
            )}
          </div>
        )}

        {/* VIEW 4: SECURITY AUTHENTICATION SCREEN */}
        {view === 'auth' && (
          <AuthScreen 
            onAuthSuccess={handleAuthSuccess} 
            onBackToHome={() => handleNavigate('home')} 
          />
        )}

        {/* VIEW 5: SECURITY ADMINISTRATIVE ROSTER PORTAL */}
        {view === 'admin' && token && user?.is_staff && (
          <AdminDashboard 
            token={token} 
            onBackToHome={() => handleNavigate('home')} 
          />
        )}

      </main>
    </div>
  )
}
