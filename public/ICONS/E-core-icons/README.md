# E-core-icons
Biblioteca de íconos centralizada

Para usar:

```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Edward5126/E-core-icons@main/style.css">
```

Para PWA, además de lo anterior, se configura el service worker como se ejemplifica:

```
const CACHE_NAME = 'e-core-icons-cache-v1';
const CDN_ORIGIN = 'https://cdn.jsdelivr.net';

// 1. Intercepción de peticiones (Fetch)
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // Verificamos si la petición va dirigida a la CDN de jsDelivr
  if (requestUrl.origin === CDN_ORIGIN) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        // Si el archivo ya está descargado localmente en la caché, lo retorna inmediatamente
        if (cachedResponse) {
          return cachedResponse;
        }

        // Si no está localmente, lo descarga de la red, lo clona para la caché y lo retorna
        return fetch(event.request).then((networkResponse) => {
          // Validamos que la respuesta sea correcta antes de almacenarla
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'cors') {
            return networkResponse;
          }

          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        });
      })
    );
  }
  // Para el resto de peticiones (archivos locales de la PWA), usar la lógica estándar.
});

// 2. Limpieza de caché (Activación) - Útil para cuando se actualice la librería
self.addEventListener('activate', (event) => {
  const cacheAllowlist = [CACHE_NAME]; // Resto de cachés de la PWA

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheAllowlist.includes(cacheName) && cacheName.startsWith('e-core-icons')) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
```
