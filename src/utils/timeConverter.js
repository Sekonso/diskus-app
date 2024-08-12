const convertToTimeAgoID = (dateString) => {
  const now = new Date()
  const date = new Date(dateString)
  const diff = now - date

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (years > 0) {
    return `${years} tahun yang lalu`
  } else if (months > 0) {
    return `${months} bulan yang lalu`
  } else if (days > 0) {
    return `${days} hari yang lalu`
  } else if (hours > 0) {
    return `${hours} jam yang lalu`
  } else if (minutes > 0) {
    return `${minutes} menit yang lalu`
  } else if (seconds > 0) {
    return `${seconds} detik yang lalu`
  } else {
    return 'baru saja'
  }
}

export { convertToTimeAgoID }
