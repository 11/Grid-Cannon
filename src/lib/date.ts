export function getFormattedDate(): string {
  const currentDate = new Date()
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  // Handle ordinal suffix for the day
  const day = currentDate.getDate()
  let daySuffix
  if (day % 10 === 1 && day !== 11) {
    daySuffix = 'st'
  } else if (day % 10 === 2 && day !== 12) {
    daySuffix = 'nd'
  } else if (day % 10 === 3 && day !== 13) {
    daySuffix = 'rd'
  } else {
    daySuffix = 'th'
  }

  const dayWithSuffix = `${day}${daySuffix}`
  const month = currentDate.toLocaleString('en-US', { month: 'long' })
  const year = currentDate.getFullYear()

  return`${month} ${dayWithSuffix}, ${year}`
}
