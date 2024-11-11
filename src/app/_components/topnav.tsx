import {SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function Topnav() {
    return (
      <nav className="flex items-center justify-between w-full border-b p-4 text-xl font-semibold">
         <div>MY PHOTO</div>
            <div>
                <SignedOut>
                <SignInButton />
                </SignedOut>
                <SignedIn>
                <UserButton />
                </SignedIn>
            </div>
         
      </nav>
    )
 }