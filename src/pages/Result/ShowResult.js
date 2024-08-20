import React, { useEffect, useState } from 'react'
import Result from './Result'
import NotFound from '../NotFound/NotFound'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

function ShowResult() {

    const [isTestTaken, setTestTaken] = useState(false)

    useEffect(() => {
        // console.log('show result component')
        if (localStorage.getItem("testTaken")) {
            setTestTaken(true)
        }
    }, [])

  return (
      <>
          <Navbar/>
        {
            isTestTaken ? <Result/> : <NotFound/>      
        }  
        <Footer/>  
      
    </>
  )
}

export default ShowResult