"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated, useConvexAuth } from "convex/react";
import { BarLoader } from "react-spinners";
import { Button } from "./ui/button";
import { LayoutDashboard } from "lucide-react";

const Header = () => {
  const { isLoading: isAuthLoading } = useConvexAuth(); // Direct hook to check auth loading state
  const path = usePathname();

  return (
    <header className="fixed top-0 w-full border-b bg-white/95 backdrop-blur z-50 supports-[backdrop-filter]:bg-white/60">
      <nav className="container mx-auto flex items-center justify-between px-4 h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logos/logo.png"
            alt="Logo"
            width={200}
            height={60}
            className="h-11 w-auto object-contain"
          />
        </Link>

        {/* Navigation Links */}
        {path === "/" && (
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              How It Works
            </Link>
          </div>
        )}

        {/* Right Side Action Area */}
        <div className="flex items-center gap-4 min-w-35 justify-end">
          <Authenticated>
            <Link href="/dashboard">
            <Button className="hidden md:inline-flex items-center gap-2 hover:bg-gray-200 hover:text-gray-900 transition" variant="ghost">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
              </Button>
              <Button variant="ghost" className="md:hidden w-10 h-10 p-0 hover:bg-gray-200 transition">
                <LayoutDashboard className="h-4 w-4" />
              </Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </Authenticated>

          {isAuthLoading && (
            <div className="text-sm text-gray-400 animate-pulse">
              Loading...
            </div>
          )}

          {/* 2. Show Sign In/Up only when explicitly Unauthenticated */}
          <Unauthenticated>
            <SignInButton mode="modal">
              <Button variant="ghost">Sign In</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button
                variant="default"
                className="bg-blue-600 hover:bg-blue-700 border-none"
              >
                Sign Up
              </Button>
            </SignUpButton>
          </Unauthenticated>

          {/* 3. Show User Profile Button when Authenticated */}
        </div>
      </nav>

      {/* Global loading line indicator */}
      {isAuthLoading && (
        <div className="absolute bottom-0 left-0 w-full">
          <BarLoader width="100%" color="#3b82f6" height={2} />
        </div>
      )}
    </header>
  );
};

export default Header;
