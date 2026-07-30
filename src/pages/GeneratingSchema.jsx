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
    <main className="relative flex min-h-screen overflow-hidden bg-[#F6EFCF] text-[#5B563E]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.55),transparent_45%),radial-gradient(circle_at_center,rgba(227,215,158,0.45),transparent_60%)]" />
      <div className="absolute left-10 top-10 h-56 w-56 rounded-full bg-white/35 blur-3xl" />
      <div className="absolute -right-12 top-1/3 h-64 w-64 rounded-full bg-[#E5D89F]/30 blur-3xl" />

      <section className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <Card className="w-full max-w-4xl rounded-[34px] border-[#DDD2A6]/70 bg-[#EFE4B7]/75 px-5 py-8 shadow-[0_30px_80px_rgba(102,92,43,0.12)] backdrop-blur-sm sm:px-8 sm:py-12 lg:px-12">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#DDD2A6] bg-[#F7F0CF] shadow-[0_0_0_12px_rgba(255,255,255,0.18)]">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#D8CCA0] bg-[#F8F1D0]">
                <HiOutlineCircleStack className="h-8 w-8 text-[#5B563E]" aria-hidden="true" />
              </div>
            </div>

            <Typography as="h1" variant="h2" className="mt-8 max-w-2xl text-[#5B563E] sm:text-[2.15rem]">
              Generating Your Database Schema...
            </Typography>

            <Typography as="p" variant="muted" className="mt-3 max-w-2xl text-[#8A825E] sm:text-[1rem]">
              Crafting a normalized, scalable structure with relationships, keys, and optimized SQL output.
            </Typography>

            {prompt ? (
              <div className="mt-4 max-w-2xl rounded-full border border-[#DDD2A6]/80 bg-white/35 px-5 py-3 text-sm text-[#6B6548] shadow-sm">
                <span className="font-medium">Prompt:</span> {prompt}
              </div>
            ) : null}

            <div className="mt-8 w-full max-w-2xl">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.4em] text-[#8A825E]">
                <span>Preparing schema</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#FBF7E4] shadow-inner shadow-[#B5A66A]/10">
                <div
                  className="h-full rounded-full bg-linear-to-r from-[#A8995E] via-[#7F7350] to-[#63593F] transition-[width] duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-white/45 px-5 py-3 text-sm font-medium text-[#5B563E] shadow-sm backdrop-blur-sm">
              <HiOutlineSparkles className="h-4 w-4" aria-hidden="true" />
              {stage}
            </div>

            <div className="mt-10 grid w-full gap-4 md:grid-cols-3">
              {loadingCards.map((card) => {
                const Icon = card.icon

                return (
                  <div
                    key={card.title}
                    className="rounded-2xl border border-[#DDD2A6]/75 bg-white/35 p-4 text-left shadow-sm backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-2 text-[#5B563E]">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      <Typography as="h3" variant="h3" className="text-sm text-[#5B563E]">
                        {card.title}
                      </Typography>
                    </div>
                    <Typography as="p" variant="muted" className="mt-2 text-[#8A825E]">
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
