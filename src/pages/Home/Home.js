import React, { useEffect } from 'react'
import Type from './Type'
import { Box } from '@mui/material';
import Controls from '../../components/Controls/Controls';

function Home() {

  useEffect(() => {
    localStorage.removeItem("testTaken");
  })
  return (
      <>
        <Box
          display="flex"
          flexDirection="column"
          minHeight="100vh"
          sx={{ overflowX: 'hidden' }}
        >
          <Controls />
          <Box flex={1} display="flex" justifyContent="center" alignItems="center" mb={10}>
            <Type />
          </Box>
        </Box>
      
    </>
  )
} 

export default Home