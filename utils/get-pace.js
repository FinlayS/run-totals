export const getPace = (ts, td) => {
  const pace = Math.round(ts / td)
  return (new Date(pace * 1000)
    .toISOString()
    .substr(11, 8))
}