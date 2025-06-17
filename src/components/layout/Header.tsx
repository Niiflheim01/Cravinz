import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/Cravinz%20Logo.png"
                alt="Cravinz Logo"
                width={120}
                height={30}
                priority
              />
            </Link>
          </div>
          <div className="flex items-center">
            <button className="text-gray-700 hover:text-green-600 focus:outline-none">
              <RxHamburgerMenu size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
} 