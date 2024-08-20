import React, { useEffect } from 'react'
import Type from './Type'
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

function Home() {

  useEffect(() => {
    localStorage.removeItem("testTaken");
  })
  return (
      <>
          <Navbar/>
          <Type />

          <Footer/>

      
    </>
  )
} 

export default Home