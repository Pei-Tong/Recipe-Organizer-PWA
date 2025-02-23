const CACHE_NAME = "recipe-organizer-pwa-cache-v1";
const FILES_TO_CACHE = [
  "/Recipe-Organizer-PWA/",
  "/Recipe-Organizer-PWA/index.html",
  "/Recipe-Organizer-PWA/style.css",
  "/Recipe-Organizer-PWA/app.js",
  "/Recipe-Organizer-PWA/manifest.json",
  "/Recipe-Organizer-PWA/icons/icon-128.png",
  "/Recipe-Organizer-PWA/icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

