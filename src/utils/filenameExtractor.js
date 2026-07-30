/**
 * Extracts a filename from the HTTP Content-Disposition header.
 * Handles standard and quoted filename formats, as well as UTF-8 encoded filenames.
 * Example input: attachment; filename="ecommerce_schema.sql"
 *
 * @param {string | null} header - Content-Disposition header string
 * @param {string} fallback - Fallback filename if parsing fails
 * @returns {string} Clean filename
 */
export function extractFilename(header, fallback = 'database_schema.sql') {
  if (!header) {
    return fallback
  }

  try {
    // Matches filename="example.sql" or filename=example.sql or filename*=UTF-8''example.sql
    const match = header.match(/filename\*?=(?:["']?([^"';\n]+)["']?|UTF-8''([^"';\n]+))/i)

    if (match) {
      let filename = (match[1] || match[2] || '').trim()
      // Remove any leftover surrounding quotes
      filename = filename.replace(/^["']|["']$/g, '')

      if (filename) {
        return decodeURIComponent(filename)
      }
    }
  } catch (error) {
    console.error('Error parsing Content-Disposition header:', error)
  }

  return fallback
}
