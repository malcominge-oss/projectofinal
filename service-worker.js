
const CACHE_NAME = "cache-app-v3";

const FILES_TO_CACHE = [
  "index.html",
  "segundo.html",
  "primerapag.html",

  "seg.html",
  "ter.html",
  "cuarto.html",
  "quinto.html",
  "sexto.html",
  "septimo.html",

  "leccion-en-linea.png",

  "qwer.js",
  "estilos.css",
  "BD.js",
  "service-worker.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );

  self.skipWaiting();
});


self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cached) => {
        return cached || fetch(event.request);
      })
      .catch(() => caches.match("index.html"))
  );
});
