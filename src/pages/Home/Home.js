import React, { useState } from 'react'
import Type from './Type'
import Result from '../Result/Result'
import Navbar from '../../components/Navbar/Navbar';

function Home() {

    const [result, showResult] = useState(false); 

  return (
      <>
          <Navbar/>
          {result ? <Result /> : <Type isFinish={showResult}  />}
      
    </>
  )
}

export default Home