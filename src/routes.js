import React from 'react'
import Media from './views/pages/media/Media'

const Dashboard = React.lazy(() => import('@views/dashboard/Dashboard'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/media', name: 'Media', element: Media },
]

export default routes
