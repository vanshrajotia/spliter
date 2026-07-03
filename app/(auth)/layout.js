import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div className='flex align-center justify-center h-screen w-screen pt-10'>
      {children}
    </div>
  )
}

export default AuthLayout
