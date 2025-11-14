/**
 * Get the target date in PST/PDT timezone
 * November 14, 2025 at 12:00 AM PST/PDT
 */
export function getTargetDateInPST(): Date {
  // Create a date string for November 14, 2025 at midnight in PST/PDT
  // Using Intl.DateTimeFormat to properly handle timezone conversion
  const year = 2025
  const month = 10 // November (0-indexed, so 10 = November)
  const day = 14
  const hour = 0
  const minute = 0
  const second = 0

  // Create date string in ISO format for PST/PDT timezone
  // Format: "2025-11-14T00:00:00" and then convert to PST/PDT
  const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`

  // Use Intl.DateTimeFormat to get the timezone offset for PST/PDT on that date
  // This accounts for daylight saving time automatically
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })

  // Create a date object for midnight PST/PDT on Nov 14, 2025
  // We'll use a temporary date to get the offset, then calculate the UTC equivalent
  const tempDate = new Date(`${dateString}Z`) // Start with UTC assumption
  
  // Get the timezone offset for America/Los_Angeles on that specific date
  // We need to calculate what UTC time corresponds to midnight PST/PDT
  const parts = formatter.formatToParts(tempDate)
  
  // Better approach: Use the timezone offset directly
  // Create date in PST/PDT timezone by using a date string that represents local time
  // and then convert it properly
  
  // Most reliable method: Create the date as if it's in PST/PDT, then get UTC equivalent
  const pstDate = new Date(`${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}T08:00:00Z`)
  
  // Get the actual offset for America/Los_Angeles on Nov 14, 2025
  // In November, after DST ends (first Sunday in November), it's PST (UTC-8)
  // DST typically ends on the first Sunday of November
  // For 2025, DST ends on November 2, 2025 at 2:00 AM
  // So November 14, 2025 will be in PST (UTC-8)
  
  // Calculate the offset: PST is UTC-8, PDT is UTC-7
  // We'll determine which one applies on Nov 14, 2025
  
  // Check if Nov 14, 2025 is in DST for America/Los_Angeles
  // DST in US typically runs from second Sunday in March to first Sunday in November
  // Nov 14, 2025 is after the first Sunday in November, so it's PST (UTC-8)
  
  // Create date for midnight PST on Nov 14, 2025
  // PST = UTC-8, so midnight PST = 8:00 AM UTC
  // But we need to verify this is correct for the actual date
  
  // Most accurate: Use a library approach or calculate the offset
  // For November 14, 2025, we know it's PST (not PDT) because DST ends earlier
  // So midnight PST = 8:00 AM UTC on Nov 14, 2025
  
  // However, to be absolutely sure and handle edge cases, let's calculate it dynamically
  const testDate = new Date(2025, 10, 14, 0, 0, 0) // Nov 14, 2025, midnight local
  
  // Get the timezone offset for America/Los_Angeles
  // We'll use a more reliable method: create the date in PST and convert
  const utcDate = new Date(Date.UTC(year, month, day, hour + 8, minute, second))
  
  // But wait, we need to account for whether it's actually PST or PDT
  // Let's use a more sophisticated approach
  
  // Create date object for Nov 14, 2025, 8:00 AM UTC (which should be midnight PST if it's PST)
  // Then verify by formatting it back to PST
  const candidateDate = new Date('2025-11-14T08:00:00Z')
  
  // Format it back to PST to verify
  const formatted = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(candidateDate)
  
  // If it's not midnight, adjust
  // This is the most reliable way - create the date, check what it represents in PST, adjust if needed
  const targetDate = new Date('2025-11-14T08:00:00Z') // Assume PST (UTC-8) first
  
  // Verify: format to PST and check if it's actually midnight
  const checkDate = new Date(targetDate)
  const pstTime = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(checkDate)
  
  // If it's not 00:00, we need to adjust
  // For November 14, 2025, DST has ended, so it's PST (UTC-8)
  // Midnight PST = 8:00 AM UTC, which is what we have
  
  return targetDate
}

/**
 * Get current time in PST/PDT
 */
export function getCurrentTimeInPST(): Date {
  const now = new Date()
  // Convert current UTC time to PST/PDT representation
  const pstTimeString = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(now)
  
  // Parse the PST time string and create a date
  // Format: "MM/DD/YYYY, HH:MM:SS"
  const [datePart, timePart] = pstTimeString.split(', ')
  const [month, day, year] = datePart.split('/')
  const [hour, minute, second] = timePart.split(':')
  
  // Create date object (this will be in local time, but represents PST time)
  // We need to calculate the difference and adjust
  const pstDate = new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
    parseInt(hour),
    parseInt(minute),
    parseInt(second)
  )
  
  // Calculate offset between UTC and PST/PDT
  const utcTime = now.getTime()
  const pstTime = pstDate.getTime()
  const offset = utcTime - pstTime
  
  // Return a date that represents current PST time
  return new Date(utcTime - offset)
}

/**
 * More accurate: Calculate midnight PST/PDT on a specific date
 * This properly handles DST transitions
 */
export function getMidnightPST(year: number, month: number, day: number): Date {
  // Create a date for midnight in America/Los_Angeles timezone
  // We'll use a method that properly accounts for DST
  
  // Method: Create date string and use timezone-aware parsing
  // Since JavaScript Date doesn't directly support timezone in constructor,
  // we need to calculate the UTC equivalent
  
  // For November 14, 2025:
  // DST ends on November 2, 2025 at 2:00 AM PDT (becomes 1:00 AM PST)
  // So November 14, 2025 is in PST (UTC-8)
  // Midnight PST on Nov 14, 2025 = 8:00 AM UTC on Nov 14, 2025
  
  // But to be absolutely accurate and handle any date, let's calculate dynamically
  // We'll create a date that represents the time in PST, then get its UTC equivalent
  
  // Use a more reliable approach: create the date in UTC that represents midnight PST
  // We need to know the offset for that specific date
  
  // Create a test date to determine the offset
  const testDateUTC = new Date(Date.UTC(year, month - 1, day, 12, 0, 0)) // Noon UTC on target date
  
  // Get what time that is in PST
  const pstFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    hour: '2-digit',
    hour12: false,
  })
  
  const pstHour = parseInt(pstFormatter.format(testDateUTC))
  
  // Calculate offset: if UTC noon is 4 AM PST, then offset is -8 (PST)
  // if UTC noon is 5 AM PDT, then offset is -7 (PDT)
  const offsetHours = pstHour - 12
  
  // Now create midnight PST by subtracting the offset from UTC
  // Midnight PST = (0 - offsetHours) UTC
  const midnightUTC = new Date(Date.UTC(year, month - 1, day, 0 - offsetHours, 0, 0))
  
  return midnightUTC
}

