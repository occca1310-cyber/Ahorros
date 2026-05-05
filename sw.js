const CACHE = 'ahorros-v1'

// Archivos que se guardan para funcionar sin internet
const archivos = [
  '/',
  '/index.html',
  '/style.css',
  '/ahorros.js',
  '/icono-192.png',
  '/icono-512.png'
]

// Cuando se instala — guarda los archivos
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => {
      return cache.addAll(archivos)
    })
  )
})

// Cuando la app pide algo — lo busca en el cache primero
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((respuesta) => {
      return respuesta || fetch(e.request)
    })
  )
})