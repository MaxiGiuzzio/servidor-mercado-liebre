
import { createServer } from 'http'
import { readFile } from 'fs'
import { join, dirname } from 'path'
import { getContentType } from './getContentType.js' // Asegúrate de importar la función getContentType
import { fileURLToPath } from 'url'



// Configuración de rutas del sistema de archivos
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename) // Obtener ruta de la carpeta actual

// Creación del servidor HTTP
const server = createServer((req, res) => {
  const  { method, url } = req

  // Manejo de solicitudes GET
  if (method === 'GET') {
    if (url === '/') {
      readFile(join(__dirname, 'views', 'home.html'), (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' })
          res.end('Error interno del servidor')
          return
        }
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(data)
      })
      
    } else if (url === '/login') {
      readFile(join(__dirname, 'views', 'login.html'), (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' })
          res.end('Error interno del servidor')
          return
        }
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(data)
      })
    } else if (url === '/register') {
      readFile(join(__dirname, 'views', 'register.html'), (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' })
          res.end('Error interno del servidor')
          return 
        }
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(data)
      })
    } else {
      let filePath = join(__dirname, url);
      filePath = filePath.replace(/\\/g, '/');
      readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' })
          res.end('Archivo no encontrado')
          return
        }
        res.writeHead(200, { 'Content-Type': getContentType(filePath) })
        res.end(data)
      });
    }
  }
  // Manejo de solicitudes POST
  else if (method === 'POST') {
    if (url === '/login' || url === '/register') {
      res.writeHead(302, { Location: '/' })
      res.end();  
    } else {  
      // Manejo de rutas no encontradas
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end('Ruta no encontrada')
    }
  }
}) 


const PORT = process.env.PORT ?? 3000
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://127.0.0.1:${PORT}/views/home.html`)
})
