import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import Hero from '../components/Hero/Hero'
import Slider from '../components/Slider/Slider'

export default function Root() {
  return (
    <>
    <Navbar />
    <Outlet/>
    </>
  )
}
