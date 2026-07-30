import { HiOutlineArrowDownTray } from 'react-icons/hi2'
import Button from '../common/Button'

export default function DownloadButton({ blob, filename = 'database_schema.sql', disabled = false }) {
  const handleDownload = () => {
    if (!blob) return

    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename || 'database_schema.sql'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Clean up memory
    window.URL.revokeObjectURL(url)
  }

  const isDisabled = disabled || !blob

  return (
    <Button
      type="button"
      variant="primary"
      onClick={handleDownload}
      disabled={isDisabled}
      leftIcon={<HiOutlineArrowDownTray className="h-5 w-5" aria-hidden="true" />}
      className="w-full sm:w-auto"
    >
      Download File
    </Button>
  )
}
