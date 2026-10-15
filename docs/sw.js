/* Show do AgriX — service worker: deixa o app instalável e abre rápido.
   Página e config: sempre busca a versão nova na internet (usa a cópia só sem conexão).
   Imagens das telas e ícones: guarda no aparelho depois da primeira vez. */
const VERSAO = "agrix-v1";
const BASE = ["./", "index.html", "config.js", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSAO).then(c => c.addAll(BASE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSAO).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin) return; // Firebase, Google e o e-mail passam direto
  const estatico = /\/(telas|icons)\//.test(url.pathname);
  if (estatico) {
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => { if (res.ok) { const cp = res.clone(); caches.open(VERSAO).then(c => c.put(req, cp)); } return res; })));
    return;
  }
  e.respondWith(fetch(req).then(res => { if (res.ok) { const cp = res.clone(); caches.open(VERSAO).then(c => c.put(req, cp)); } return res; })
    .catch(() => caches.match(req, {ignoreSearch: true}).then(r => r || caches.match("index.html"))));
});
