import path from 'path'

export const getContentType = (filePath) => {
  const extname = path.extname(filePath)
  switch (extname) {
    case '.js':
      return 'text/javascript'
    case '.css':
      return 'text/css'
    case '.json':
      return 'application/json'
    case '.png':
      return 'image/png'
    case '.jpg':
      return 'image/jpeg'
    case '.jpeg':
      return 'image/jpeg'
    case '.svg':
      return 'image/svg+xml'
    default:
      return 'text/plain'
    case '.html':
      return 'text/html'
  }
}
