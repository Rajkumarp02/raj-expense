import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'


export default function Rootlayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}
