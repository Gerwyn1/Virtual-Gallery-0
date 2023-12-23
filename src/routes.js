import React from 'react'

const Dashboard = React.lazy(() => import('@views/dashboard/Dashboard'))
const Media = React.lazy(() => import('@views/media/Media'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/media', name: 'Media', element: Media },
]

export default routes