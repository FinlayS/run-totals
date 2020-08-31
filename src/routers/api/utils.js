export const getUrl = (url) => {
  if (process.env.NODE_ENV !== 'production') {
    return `http://localhost:3001${url}`
  }
  return url
}