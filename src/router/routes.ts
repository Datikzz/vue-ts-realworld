export const vueRoutes = Object.freeze({
  home: { name: 'home', path: '/' },
  login: { name: 'login', path: '/login' },
  register: { name: 'register', path: '/register' },
  settings: { name: 'settings', path: '/settings' },
  editor: { name: 'editor', path: '/editor' },
  profile: { name: 'profile', path: '/profile/:username' },
  article: { name: 'article', path: '/article/:slug' },
})
