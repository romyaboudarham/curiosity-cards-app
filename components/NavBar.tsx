'use client'

import Link from "next/link";
import Image from "next/image";
import RoundButton from "./RoundButton";

export default function NavBar() {
  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-surface-background/20 backdrop-blur-sm">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group cursor-pointer">
            <Image
              src="/logo-icon.png"
              alt="CuriosityCards"
              width={36}
              height={32}
              className="w-8 h-7 sm:w-9 sm:h-8"
            />
            <span className="text-lg sm:text-xl md:text-2xl text-text-heading-logo">
              CuriosityCards
            </span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center space-x-2 lg:space-x-3 pr-9">
            <RoundButton
              href="/profile"
              icon={<img src="/profile-icon.png" alt="Profile" className="w-6 h-6" />}
              label="Profile"
              className="w-9 h-9"
            />
            <RoundButton
              href="/decks"
              icon={<img src="/decks-icon.png" alt="Decks" className="w-6 h-6" />}
              label="Decks"
              className="w-9 h-9"
            />
            <RoundButton
              href="/"
              icon={<img src="/add-icon.png" alt="Add" className="w-6 h-6" />}
              label="Add"
              className="w-9 h-9"
            />
          </div>
        </div>
      </div>
    </nav>
  )
}