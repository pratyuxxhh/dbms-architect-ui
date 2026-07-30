import { HiOutlineSparkles } from 'react-icons/hi2'
import Button from '../common/Button'
import Typography from '../common/Typography'
import PromptTextarea from './PromptTextarea'
import LoadingSpinner from './LoadingSpinner'

export default function PromptInput({
  prompt,
  onChange,
  onSubmit,
  loading = false,
  disabled = false,
}) {
  const handleSubmit = (event) => {
    event.preventDefault()
    if (!prompt.trim() || loading || disabled) return
    onSubmit()
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmit(event)
    }
  }

  const isButtonDisabled = disabled || loading || !prompt.trim()

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div>
        <Typography as="h2" variant="h3">
          Generate SQL Database
        </Typography>
        <Typography as="p" variant="muted" className="mt-1">
          Enter your requirements to generate a production-ready SQL database schema script.
        </Typography>
      </div>

      <div>
        <label htmlFor="sql-prompt-input" className="sr-only">
          Prompt Input
        </label>
        <PromptTextarea
          id="sql-prompt-input"
          value={prompt}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='Describe your application... e.g. "Create an ecommerce database with users, products, orders, and payments."'
          aria-label="Prompt Input"
          disabled={loading || disabled}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <Typography as="p" variant="muted" className="flex items-center gap-2 text-xs sm:text-sm">
          <HiOutlineSparkles className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          Generates ANSI SQL / PostgreSQL compatible migration schema.
        </Typography>

        <Button
          type="submit"
          variant="primary"
          disabled={isButtonDisabled}
          loading={false}
          className="w-full sm:w-auto"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <LoadingSpinner className="h-4 w-4" />
              <span>Generating SQL...</span>
            </span>
          ) : (
            'Generate SQL'
          )}
        </Button>
      </div>
    </form>
  )
}
