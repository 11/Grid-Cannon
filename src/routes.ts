export const ROUTING_TABLE = [
  {
    path: '/new-game',
    component: 'view-game',
    action: async () => {
      await import('./views/view-game/view-game')
    },
  },
  {
    path: '/daily-board',
    component: 'view-game',
    action: async () => {
      await import('./views/view-game/view-game')
    },
  },
  {
    path: '/',
    component: 'view-home',
    action: async () => {
      await import('./views/view-home/view-home')
    },
  },
  {
    path: '(.*)',
    component: 'view-home',
    action: async () => {
      await import('./views/view-home/view-home')
    },
  },
]
