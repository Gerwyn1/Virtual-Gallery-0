import React from 'react'
// import Profile from './views/profile/Profile'

const Dashboard = React.lazy(() => import('@views/dashboard/Dashboard'))
const Media = React.lazy(() => import('@views/media/Media'))
const Users = React.lazy(() => import('@views/users/Users'))
const Settings = React.lazy(() => import('@views/settings/Settings'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/users', name: 'Users', element: Users },
  { path: '/settings', name: 'Settings', element : Settings },
  // { path: '/profile', name: 'Profile' , element: Profile},
  { path: '/media', name: 'Media', element: Media },
]

export default routes