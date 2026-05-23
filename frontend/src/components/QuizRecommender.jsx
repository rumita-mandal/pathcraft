import React, { useState } from 'react'
import { CheckCircle2, ChevronRight, Trophy, RotateCcw, BrainCircuit } from 'lucide-react'

const QUIZ_QUESTIONS = [
  {
    question: "What excites you most when interacting with a digital application?",
    options: [
      { text: "Spectacular UI designs, fluid animations, and interactive client screens.", weight: { frontend: 3 } },
      { text: "Seamless server operations, quick API responses, and database integrations.", weight: { backend: 3 } },
      { text: "Ultra-fast deployment cycles, system scalability, and cloud networks.", weight: { devops: 3 } },
      { text: "Smart recommendation algorithms and extracting patterns from raw figures.", weight: { data: 3 } },
      { text: "System security barriers, scanning for vulnerabilities, and locking down data.", weight: { security: 3 } }
    ]
  },
  {
    question: "Select your favorite digital construction materials:",
    options: [
      { text: "Colors, typography layouts, responsive forms, and React components.", weight: { frontend: 3 } },
      { text: "REST API routes, model schemas, SQL tables, and session tokens.", weight: { backend: 3 } },
      { text: "Docker containers, Linux commands, shell scripts, and YAML files.", weight: { devops: 3 } },
      { text: "NumPy arrays, Pandas tables, statistical formulas, and training curves.", weight: { data: 3 } },
      { text: "Cryptographic keys, firewalls, packet filters, and subnet tables.", weight: { security: 3 } }
    ]
  },
  {
    question: "Which category of problems sounds the most fun to debug?",
    options: [
      { text: "Fixing misaligned navigation headers, font glitches, and mobile view overflows.", weight: { frontend: 3 } },
      { text: "Optimizing a sluggish database query and securing user passwords.", weight: { backend: 3 } },
      { text: "Resolving a broken CI/CD pipeline script and recovering a crashed cloud node.", weight: { devops: 3 } },
      { text: "Fixing biased algorithm models and sanitizing corrupt dataset rows.", weight: { data: 3 } },
      { text: "Investigating unauthorized network traffic and patch-fixing API logic holes.", weight: { security: 3 } }
    ]
  },
  {
    question: "What language or tool stack speaks to your technical curiosity?",
    options: [
      { text: "HTML, CSS, JavaScript, and modern frontend frameworks like React.", weight: { frontend: 3 } },
      { text: "Python, Django, Node.js, and relational database systems.", weight: { backend: 3 } },
      { text: "Bash shell, YAML configs, GitHub Actions, and container runtimes.", weight: { devops: 3 } },
      { text: "Python with Scikit-learn, PyTorch, and SQL charts.", weight: { data: 3 } },
      { text: "Linux terminals, Kali hacking packages, and packet captures.", weight: { security: 3 } }
    ]
  },
  {
    question: "How do you envision your ultimate day-to-day impact?",
    options: [
      { text: "Designing premium interfaces that end-users see and interact with immediately.", weight: { frontend: 3 } },
      { text: "Architecting secure, high-performance logic servers that power everything.", weight: { backend: 3 } },
      { text: "Automating cloud operations to keep heavy global systems completely online.", weight: { devops: 3 } },
      { text: "Analyzing business intelligence data to formulate smart strategic predictions.", weight: { data: 3 } },
      { text: "Securing internet systems against hackers and protecting digital privacy.", weight: { security: 3 } }
    ]
  }
]

export default function QuizRecommender({ careers, onSelectCareer }) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [scores, setScores] = useState({ frontend: 0, backend: 0, devops: 0, data: 0, security: 0 })
  const [selectedOpt, setSelectedOpt] = useState(null)
  const [recommendation, setRecommendation] = useState(null)

  const handleNext = () => {
    if (selectedOpt === null) return

    // Update cumulative scores
    const weight = QUIZ_QUESTIONS[currentIdx].options[selectedOpt].weight
    const newScores = { ...scores }
    Object.keys(weight).forEach(key => {
      newScores[key] = (newScores[key] || 0) + weight[key]
    })
    setScores(newScores)

    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1)
      setSelectedOpt(null)
    } else {
      // Calculate final recommended path
      let recommendedKey = 'frontend'
      let maxVal = -1
      Object.keys(newScores).forEach(key => {
        if (newScores[key] > maxVal) {
          maxVal = newScores[key]
          recommendedKey = key
        }
      })

      // Map recommended key to actual career slug seeded in DB
      let slug = 'frontend-developer'
      if (recommendedKey === 'backend') slug = 'backend-developer'
      else if (recommendedKey === 'devops') slug = 'devops-engineer'
      else if (recommendedKey === 'data') slug = 'data-scientist-ai-engineer'
      else if (recommendedKey === 'security') slug = 'cybersecurity-specialist'

      const matchedCareer = careers.find(c => c.slug === slug) || careers[0]
      setRecommendation(matchedCareer)
    }
  }

  const handleReset = () => {
    setCurrentIdx(0)
    setScores({ frontend: 0, backend: 0, devops: 0, data: 0, security: 0 })
    setSelectedOpt(null)
    setRecommendation(null)
  }

  const progressPercentage = ((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100

  // 1. Results View
  if (recommendation) {
    return (
      <div className="glass quiz-card animate-fade-in" style={{ borderColor: 'rgba(192, 132, 252, 0.25)', boxShadow: '0 0 40px -10px rgba(192, 132, 252, 0.15)' }}>
        <div style={{ display: 'inline-flex', padding: '1rem', borderRadius: '50%', background: 'rgba(168, 85, 247, 0.1)', color: 'var(--accent)', marginBottom: '1.5rem' }}>
          <BrainCircuit size={48} className="pulse-glow" />
        </div>
        <h2 className="quiz-results-title">Your Recommended Path: <span className="gradient-text">{recommendation.title}</span></h2>
        <p className="quiz-results-sub" style={{ fontSize: '1.05rem', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
          Based on your answers, you possess strong instincts for <strong>{recommendation.title}</strong>! You love {recommendation.description.split('.')[1]?.trim() || "building and securing digital spaces."} Explore your step-by-step roadmap below.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem' }}>
          <button onClick={handleReset} className="btn btn-secondary">
            <RotateCcw size={16} />
            Retake Quiz
          </button>
          <button onClick={() => onSelectCareer(recommendation)} className="btn btn-primary">
            Start Learning
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    )
  }

  // 2. Active Question View
  const activeQ = QUIZ_QUESTIONS[currentIdx]
  const letters = ['A', 'B', 'C', 'D', 'E']

  return (
    <div className="glass quiz-card animate-fade-in">
      <div className="quiz-progress">
        <span>Milestone Recommendation Quiz</span>
        <span>Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}</span>
      </div>
      <div className="progress-bar-container">
        <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
      </div>

      <h3 className="quiz-question">{activeQ.question}</h3>

      <div className="quiz-options">
        {activeQ.options.map((opt, optIdx) => (
          <button
            key={optIdx}
            className={`quiz-option ${selectedOpt === optIdx ? 'selected' : ''}`}
            onClick={() => setSelectedOpt(optIdx)}
          >
            <span className="quiz-option-letter">{letters[optIdx]}</span>
            <span>{opt.text}</span>
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={handleNext}
          disabled={selectedOpt === null}
          className="btn btn-primary"
          style={{ opacity: selectedOpt === null ? 0.5 : 1, cursor: selectedOpt === null ? 'not-allowed' : 'pointer' }}
        >
          {currentIdx === QUIZ_QUESTIONS.length - 1 ? 'Analyze My Profile' : 'Next Question'}
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}
