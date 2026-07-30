import { useState } from 'react'
import DashboardLayout from '../components/layout/DashboardLayout'
import Card from '../components/common/Card'
import PromptInput from '../components/dashboard/PromptInput'
import SQLDownloadCard from '../components/dashboard/SQLDownloadCard'
import AlertMessage from '../components/dashboard/AlertMessage'
import { extractFilename } from '../utils/filenameExtractor'

const API_URL = import.meta.env.VITE_API_URL

export default function Dashboard() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [blob, setBlob] = useState(null)
  const [filename, setFilename] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleGenerateSQL = async () => {
    const trimmedPrompt = prompt.trim()
    if (!trimmedPrompt || loading) return

    setLoading(true)
    setError('')
    setSuccessMessage('')
    setBlob(null)
    setFilename('')

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        `${API_URL}/ai/download?m=${encodeURIComponent(trimmedPrompt)}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token || ''}`,
          },
        }
      )

      if (response.status === 200) {
        const fileBlob = await response.blob()
        const contentDisposition = response.headers.get('Content-Disposition') || response.headers.get('content-disposition')
        
        // Derive fallback filename from prompt if disposition header is empty
        const defaultFilename = `${trimmedPrompt.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '') || 'database'}_schema.sql`
        const extractedName = extractFilename(contentDisposition, defaultFilename)

        setBlob(fileBlob)
        setFilename(extractedName)
        setSuccessMessage('SQL file generated successfully.')
      } else if (response.status === 400) {
        const bodyText = await response.text()
        setError(bodyText || 'The request is invalid. No SQL schema could be generated.')
      } else if (response.status === 404) {
        setError('Generated file not found.')
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch (err) {
      console.error('Failed to generate SQL schema:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <section className="mx-auto max-w-4xl space-y-6">
        <Card className="rounded-4xl border-primary/10 bg-surface/90 p-6 sm:p-8 shadow-xl shadow-primary/8 space-y-6">
          <PromptInput
            prompt={prompt}
            onChange={setPrompt}
            onSubmit={handleGenerateSQL}
            loading={loading}
          />

          {error && (
            <AlertMessage
              type="error"
              message={error}
              onClose={() => setError('')}
            />
          )}

          {successMessage && (
            <AlertMessage
              type="success"
              message={successMessage}
              onClose={() => setSuccessMessage('')}
            />
          )}

          <SQLDownloadCard blob={blob} filename={filename} />
        </Card>
      </section>
    </DashboardLayout>
  )
}