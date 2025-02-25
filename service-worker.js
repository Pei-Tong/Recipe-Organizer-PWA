const CACHE_NAME = "recipe-organizer-pwa-cache-v1";
const FILES_TO_CACHE = [
  "/Recipe-Organizer-PWA/",
  "/Recipe-Organizer-PWA/assets/html/index.html",
  "/Recipe-Organizer-PWA/assets/html/recipes.html",
  "/Recipe-Organizer-PWA/assets/css/style.css",
  "/Recipe-Organizer-PWA/assets/js/signIn.js",
  "/Recipe-Organizer-PWA/assets/js/firebase.js",
  "/Recipe-Organizer-PWA/assets/js/recipes.js",
  "/Recipe-Organizer-PWA/manifest.json",
  "/Recipe-Organizer-PWA/assets/icons/icon-128.png",
  "/Recipe-Organizer-PWA/assets/icons/icon-512.png",
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

