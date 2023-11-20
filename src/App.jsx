import React, {  Suspense } from 'react'
import {  Route, Routes, BrowserRouter} from 'react-router-dom'
import './scss/style.scss'
import Loading from '@components/GalleryLoading'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('@layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('@views/pages/login/Login'))
const Register = React.lazy(() => import('@views/pages/register/Register'))
const Page404 = React.lazy(() => import('@views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('@views/pages/page500/Page500'))

const App = () =>  {
  console.log('app 2')
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route path="/login" name="Login Page" element={<Login />} />
            <Route path="/register" name="Register Page" element={<Register />} />
            <Route path="/404" name="Page 404" element={<Page404 />} />
            <Route path="/500" name="Page 500" element={<Page500 />} />
            <Route path="/gallery" name="Gallery" element={<Loading/>} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
}

export default App
