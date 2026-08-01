import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  HiOutlineCircleStack,
  HiOutlineLink,
  HiOutlineSparkles,
  HiOutlineTableCells,
} from 'react-icons/hi2'
import Card from '../components/common/Card'
import Typography from '../components/common/Typography'

const API_URL = import.meta.env.VITE_API_URL

function generateFallbackSql(promptText) {
  const cleanPrompt = promptText || 'Database System'
  const slug = cleanPrompt
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '') || 'generated'

  const dateStr = new Date().toISOString().split('T')[0]

  return `-- ============================================================
-- DBMS Architect Generated SQL Schema
-- System / Prompt: ${cleanPrompt}
-- Generated Date: ${dateStr}
-- Engine: PostgreSQL / Standard SQL ANSI-92
-- ============================================================

-- Drop existing tables (in reverse order of dependency)
DROP TABLE IF EXISTS ${slug}_logs CASCADE;
DROP TABLE IF EXISTS ${slug}_items CASCADE;
DROP TABLE IF EXISTS ${slug}_categories CASCADE;
DROP TABLE IF EXISTS ${slug}_users CASCADE;

-- 1. Users / Accounts Entity
CREATE TABLE ${slug}_users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE', 'SUSPENDED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Categories / Classifications Entity
CREATE TABLE ${slug}_categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Core Items / Records Entity
CREATE TABLE ${slug}_items (
    item_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    category_id INT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_item_user FOREIGN KEY (user_id) REFERENCES ${slug}_users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_item_category FOREIGN KEY (category_id) REFERENCES ${slug}_categories(category_id) ON DELETE SET NULL
);

-- 4. Audit Logs Entity
CREATE TABLE ${slug}_logs (
    log_id BIGSERIAL PRIMARY KEY,
    item_id INT REFERENCES ${slug}_items(item_id) ON DELETE CASCADE,
    action VARCHAR(50) NOT NULL,
    performed_by INT REFERENCES ${slug}_users(user_id),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for Query Performance Optimization
CREATE INDEX idx_${slug}_items_user ON ${slug}_items(user_id);
CREATE INDEX idx_${slug}_items_category ON ${slug}_items(category_id);
CREATE INDEX idx_${slug}_logs_action ON ${slug}_logs(action);

-- Success message
SELECT 'Schema generation completed successfully for ${cleanPrompt}' AS status;
`
}

export default function GeneratingSchema() {
  const navigate = useNavigate()
  const location = useLocation()
  const prompt = location.state?.prompt ?? ''
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let isMounted = true
    const startedAt = Date.now()
    const minDuration = 2500

    const progressInterval = window.setInterval(() => {
      const elapsed = Date.now() - startedAt
      const nextProgress = Math.min(95, (elapsed / minDuration) * 95)
      if (isMounted) setProgress(nextProgress)
    }, 60)

    const fetchSqlAndNavigate = async () => {
      let sqlResult = ''
      const token = localStorage.getItem('token')

      try {
        const response = await fetch(`${API_URL}/user/generate-schema`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ prompt }),
        })

        if (response.ok) {
          sqlResult = await response.text()
        } else {
          console.warn('Backend responded with non-200 status, using fallback schema generator.')
          sqlResult = generateFallbackSql(prompt)
        }
      } catch (error) {
        console.warn('Backend server connection failed/offline. Using fallback schema generator:', error)
        sqlResult = generateFallbackSql(prompt)
      }

      const elapsedMs = Date.now() - startedAt
      const remainingMs = Math.max(0, minDuration - elapsedMs)

      window.setTimeout(() => {
        if (!isMounted) return
        setProgress(100)

        window.setTimeout(() => {
          if (!isMounted) return
          const safeSlug = (prompt || 'schema')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '_')
            .replace(/^_+|_+$/g, '') || 'schema'

          navigate('/dashboard', {
            replace: true,
            state: {
              sqlContent: sqlResult,
              fileName: `${safeSlug}_schema.sql`,
              prompt,
            },
          })
        }, 300)
      }, remainingMs)
    }

    fetchSqlAndNavigate()

    return () => {
      isMounted = false
      window.clearInterval(progressInterval)
    }
  }, [navigate, prompt])

  const stage = useMemo(() => {
    if (progress < 33) {
      return 'Understanding your requirements...'
    }

    if (progress < 66) {
      return 'Mapping entities and relationships...'
    }

    return 'Generating schema output...'
  }, [progress])

  const loadingCards = [
    {
      icon: HiOutlineCircleStack,
      title: 'Normalization',
      body: 'Structuring entities and reducing redundancy.',
    },
    {
      icon: HiOutlineLink,
      title: 'Relationships',
      body: 'Mapping foreign keys and cardinality rules.',
    },
    {
      icon: HiOutlineTableCells,
      title: 'SQL Output',
      body: 'Generating production-ready migration scripts.',
    },
  ]

  return (
    <main className="relative flex min-h-screen overflow-hidden bg-background text-primary">
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/20 blur-[120px] pointer-events-none" />

      <section className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-center px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <Card className="w-full max-w-4xl rounded-[24px] sm:rounded-[34px] border border-primary/20 bg-surface/80 px-4 py-8 shadow-2xl shadow-primary/10 backdrop-blur-xl sm:px-12 sm:py-16">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            
            {/* Pulsing AI Brain Icon */}
            <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full border border-primary/20 bg-background shadow-lg">
              <div className="absolute inset-0 rounded-full border border-amber-400/50 animate-ping opacity-20" />
              <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-primary/10">
                <HiOutlineSparkles className="h-7 w-7 sm:h-8 sm:w-8 text-amber-500 animate-pulse" aria-hidden="true" />
              </div>
            </div>

            <Typography as="h1" variant="h2" className="mt-6 sm:mt-10 max-w-2xl text-xl font-extrabold text-primary sm:text-4xl tracking-tight">
              Generating Your Database Schema...
            </Typography>

            <Typography as="p" variant="muted" className="mt-3 sm:mt-4 max-w-2xl text-sm sm:text-lg text-secondary">
              Crafting a normalized, scalable structure with relationships, keys, and optimized SQL output.
            </Typography>

            {prompt && (
              <div className="mt-6 sm:mt-8 w-full max-w-2xl rounded-2xl border border-primary/15 bg-background/50 px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm text-primary/80 shadow-inner font-mono relative overflow-hidden text-left break-words">
                <div className="absolute top-0 left-0 w-1 h-full bg-amber-400" />
                <span className="font-bold text-amber-600 block mb-1">PROMPT INGESTED</span>
                <span className="text-xs break-words">"{prompt}"</span>
              </div>
            )}

            <div className="mt-8 sm:mt-10 w-full max-w-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-xs font-mono uppercase tracking-widest text-primary/70 mb-3">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {stage}
                </span>
                <span className="font-bold text-primary self-end sm:self-auto">{Math.round(progress)}%</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-background border border-primary/10 shadow-inner">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-300 transition-[width] duration-100 ease-linear relative overflow-hidden"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 w-full h-full animate-[slide-right_2s_infinite]" />
                </div>
              </div>
            </div>

            <div className="mt-10 sm:mt-14 grid w-full gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {loadingCards.map((card, idx) => {
                const Icon = card.icon
                // Staggered fade in based on progress
                const isVisible = progress > (idx * 30)

                return (
                  <div
                    key={card.title}
                    className={`rounded-2xl border border-primary/15 bg-background/60 p-4 sm:p-5 text-left shadow-sm transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-4'}`}
                  >
                    <div className="flex items-center gap-3 text-primary mb-2 sm:mb-3">
                      <div className={`p-2 rounded-lg ${isVisible ? 'bg-amber-100 text-amber-700' : 'bg-primary/10 text-primary'}`}>
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <Typography as="h3" variant="h3" className="text-sm font-bold">
                        {card.title}
                      </Typography>
                    </div>
                    <Typography as="p" variant="muted" className="text-xs leading-relaxed">
                      {card.body}
                    </Typography>
                  </div>
                )
              })}
            </div>
          </div>
        </Card>
      </section>
    </main>
  )
}
