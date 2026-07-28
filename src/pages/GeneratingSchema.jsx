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

const durationMs = 10000

export default function GeneratingSchema() {
  const navigate = useNavigate()
  const location = useLocation()
  const prompt = location.state?.prompt ?? ''
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const startedAt = Date.now()

    const intervalId = window.setInterval(() => {
      const elapsed = Date.now() - startedAt
      const nextProgress = Math.min(100, (elapsed / durationMs) * 100)

      setProgress(nextProgress)
    }, 80)

    const timeoutId = window.setTimeout(() => {
      navigate('/dashboard', { replace: true })
    }, durationMs)

    return () => {
      window.clearInterval(intervalId)
      window.clearTimeout(timeoutId)
    }
  }, [navigate])

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
