import {Show, SignInButton,SignOutButton,SignUpButton, UserButton } from '@clerk/nextjs'
import React from 'react'

const Header = () => {
  return (
    <div>
      {/* Replaces <SignedOut> */}
      <Show when="signed-out">
        <SignInButton />
        <SignUpButton />
      </Show>
      
      {/* Replaces <SignedIn> */}
      <Show when="signed-in">
        <UserButton />
        <SignOutButton/>
      </Show>
    </div>
  )
}

export default Header
