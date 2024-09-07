import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <>
            <div className='parent flex flex-col justify-start gap-20  '>
            <Navbar  />
            <Outlet />
            </div>
        </>
    )
}
