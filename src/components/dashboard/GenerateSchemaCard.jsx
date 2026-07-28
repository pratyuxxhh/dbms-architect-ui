import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiOutlineDocumentText, HiOutlineSparkles } from 'react-icons/hi2'
import Card from '../common/Card'
import Button from '../common/Button'
import Typography from '../common/Typography'
import PremiumBadge from './PremiumBadge'
import PromptTextarea from './PromptTextarea'

export default function GenerateSchemaCard() {
  const [prompt, setPrompt] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()

    const trimmedPrompt = prompt.trim()

    if (!trimmedPrompt) {
      return
    }
    console.log('Generating schema with prompt:', trimmedPrompt)
    navigate('/generating-schema', {
      state: {
        prompt: trimmedPrompt,
      },
    })
  }

  return (
    <Card className="rounded-4xl border-primary/10 bg-surface/90 p-5 shadow-xl shadow-primary/8 sm:p-6 lg:p-7">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-background shadow-sm shadow-primary/8">
              <HiOutlineDocumentText className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <Typography as="h2" variant="h3">
                Generate a schema
              </Typography>
              <Typography as="p" variant="muted" className="mt-1">
                Describe your application and let the architect do the rest.
              </Typography>
            </div>
          </div>

          <PremiumBadge />
        </div>

        <div className="mt-5">
          <label htmlFor="schema-prompt" className="sr-only">
            Describe your application
          </label>
          <PromptTextarea
            id="schema-prompt"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder='Describe your application... e.g. "Design a hospital management system database."'
            aria-label="Describe your application"
          />
        </div>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Typography as="p" variant="muted" className="flex items-center gap-2">
            <HiOutlineSparkles className="h-4 w-4" aria-hidden="true" />
            Supports entities, relationships, constraints, and indexing guidance.
          </Typography>

          <Button type="submit" fullWidth className="sm:w-auto sm:self-end" variant="primary">
            Generate Schema
          </Button>
        </div>
      </form>
    </Card>
  )
}