import React from 'react'
import Navbar from '../../components/landingPage/Navbar'
import Hero from '../../components/landingPage/Hero'
import Features from '../../components/landingPage/Features'
import Fnq from '../../components/landingPage/Fnq'
import Footer from '../../components/landingPage/Footer'

const Main = () => {
  return (
    <div>
      {/* navbar */}
      <Navbar/>
      {/* hero  */}
      <Hero/>
      {/* features */}
      <Features/>
      {/* fnq */}
      <Fnq/>
      {/* footer */}
      <Footer/>
    </div>
  )
}

export default Main
