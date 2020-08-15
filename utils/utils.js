export const validUpdates = (req, allowedUpdates) => {
  return new Promise((resolve, reject) => {
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (isValidOperation) {
      resolve()
    } else {
      reject()
    }
  })
}

export const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b)
    }, 2000)
  })
}