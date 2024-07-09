export const ROUTING_TABLE = [
  {
    path: '/game',
    component: 'view-game',
    action: async () => {
      await import('./views/view-game')
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
