import React from 'react'
import Login from './Components/Auth/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout';
import Register from './Components/Auth/Register';
import { DarkContextProvider } from './Context/darkContext';
import { AuthContextProvider } from './Context/auth';
import Posts from './Components/Posts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostDetails from './Components/PostDetails';
import Profile from './Components/Profile';
import ProtectedRoute from './Components/ProtectedRoute';


export default function App() {

  let routes = createBrowserRouter([{
    path: '', element: <Layout></Layout>, children: [
      { path: 'login', element: <Login></Login> },
      { path: '/postdetails/:id', element: <ProtectedRoute><PostDetails></PostDetails></ProtectedRoute> },
      { path: '/', element: <ProtectedRoute> <Posts></Posts></ProtectedRoute> },
      { path: '/profile', element: <ProtectedRoute><Profile></Profile></ProtectedRoute> },
      { path: 'register', element: <Register></Register> }
    ]
  }])

  const queryClient = new QueryClient()
  return (
    <div className='dark:bg-[#18191A] dark:text-white h-[100%]' >
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <DarkContextProvider>
            <RouterProvider router={routes}></RouterProvider>
          </DarkContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </div>

  )
}
