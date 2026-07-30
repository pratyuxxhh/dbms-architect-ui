import { useState } from 'react'
import { toast } from 'react-toastify'
import DashboardLayout from '../components/layout/DashboardLayout'
import PromptInput from '../components/dashboard/PromptInput'
import SQLDownloadCard from '../components/dashboard/SQLDownloadCard'
import { extractFilename } from '../utils/filenameExtractor'

const API_URL = import.meta.env.VITE_API_URL

export default function Dashboard() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [blob, setBlob] = useState(null)
  const [filename, setFilename] = useState('')
  const [selectedDialect, setSelectedDialect] = useState('postgresql')

  const handleGenerateSQL = async () => {
    const trimmedPrompt = prompt.trim()
    if (!trimmedPrompt || loading) return

    setLoading(true)
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
        toast.success('SQL file generated successfully!')
      } else if (response.status === 400) {
        const bodyText = await response.text()
        toast.error(bodyText || 'The request is invalid. No SQL schema could be generated.')
      } else if (response.status === 404) {
        toast.error('Generated file not found.')
      } else {
        toast.error('Something went wrong. Please try again.')
      }
    } catch (err) {
      console.error('Failed to generate SQL schema:', err)
      const errorMessage =
        err instanceof TypeError && err.message.includes('Failed to fetch')
          ? 'Connection refused. Please try again after some time.'
          : 'Something went wrong. Please try again.'
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const fileSizeKb = blob ? (blob.size / 1024).toFixed(2) : null
  const generationStatus = loading ? 'generating' : blob ? 'success' : 'idle'

  return (
    <DashboardLayout
      selectedDialect={selectedDialect}
      onSelectDialect={setSelectedDialect}
      generationStatus={generationStatus}
      fileSizeKb={fileSizeKb}
      promptLength={prompt.length}
      onSelectHistoryPrompt={(historyPrompt) => setPrompt(historyPrompt)}
    >
      <div className="max-w-5xl mx-auto space-y-6">
        <PromptInput
          prompt={prompt}
          onChange={setPrompt}
          onSubmit={handleGenerateSQL}
          loading={loading}
        />

        <SQLDownloadCard
          blob={blob}
          filename={filename}
          onRegenerate={handleGenerateSQL}
        />
      </div>
    </DashboardLayout>
  )
}