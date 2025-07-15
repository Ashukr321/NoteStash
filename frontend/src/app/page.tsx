
import Main from '@/pages/mainpage/Main'
import React from 'react'
import { ThemeProvider } from '@/components/common/ThemeContext'

const page = () => {
  return (
    <div>
      <ThemeProvider>
      <Main/>
      </ThemeProvider>
    </div>
  )
}


export default page
