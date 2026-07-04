"use client"

import {Show, SignInButton,SignOutButton,SignUpButton, UserButton } from '@clerk/nextjs'
import React from 'react'
import { useStoreUser } from '@/hooks/use-store-user'
import {BarLoader} from "react-spinners";

const Header = () => {

  const {isLoading} = useStoreUser();

  return (
    <header className="fixed top-0 w-full border-b bg-white/95 backdrop-blur z-50 supports-[backdrop-filter]:bg-white/60  ">
      <nav>
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
      </nav>
      {isLoading && <BarLoader width="100%" color="#3b82f6" />}
    </header>
  )
}

export default Header
