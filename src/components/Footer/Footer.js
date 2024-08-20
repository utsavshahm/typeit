import { Instagram, LinkedIn, MailOutline, Web } from '@mui/icons-material'
import { Stack } from '@mui/material'
import React from 'react'
import './footer.css'
import { Link } from 'react-router-dom'
function Footer() {
  return (
      <>

        <Stack className='footer-container' direction={'row'}>
              
              <Stack className='owner-name'>
                  <p>Created by Utsav Shah 😄</p>
              </Stack>
              
              <Stack className='social-links' direction={'row'}>
                  
                  <Link to={"https://linkedin.com/in/shahutsavm"} className='social-icon' target='_blank'>
                      <LinkedIn fontSize='large' />
                  </Link>

                  <Link to={"https://utsavshah.vercel.app"} className='social-icon' target='_blank'>
                    <Web fontSize='large'/>
                  </Link>

                  <Link to={"https://instagram.com/utsavmshah"} className='social-icon' target='_blank'>
                    <Instagram fontSize='large'/>
                  </Link>

                  <Link to={"mailto:shah.utsavm@gmail.com"} className='social-icon' target='_blank'>
                    <MailOutline fontSize='large'/>
                  </Link>
              </Stack>

        </Stack>
      
      
      
      </>
  )
}

export default Footer