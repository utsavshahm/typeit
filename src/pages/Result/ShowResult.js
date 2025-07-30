import React, { useEffect, useState } from 'react'
import Result from './Result'
import NotFound from '../NotFound/NotFound'
import { Box } from '@mui/material'

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
        <Box
        display="flex"
        flexDirection="column"
        minHeight="100vh"
        sx={{ overflowX: 'hidden' }}
        >
                <Box flex={1} display="flex" justifyContent="center" alignItems="center">
                    {
                        isTestTaken ? <Result/> : <NotFound/>      
                    }  
                </Box>
        </Box>

      
    </>
  )
}

export default ShowResult