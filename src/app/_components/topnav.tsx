"use client";
import {SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';

import { UploadButton } from '~/utils/uploadthing'

export default function Topnav() {
    const router = useRouter();
    return (
      <nav className="flex items-center justify-between w-full border-b p-4 text-xl font-semibold">
         <div>MY PHOTO</div>
            <div className='flex flex-row'>
                <SignedOut>
                <SignInButton />
                </SignedOut>
                <SignedIn>
                <UploadButton 
                endpoint='imageUploader' 
                onClientUploadComplete={() => {
                    router.refresh();
                }}
                 onUploadError={(error:Error) => {
                    alert(`ERROR! ${error.message}`);
                 }}/>
                <UserButton/>
                </SignedIn>
            </div>
         
      </nav>
    )
 }