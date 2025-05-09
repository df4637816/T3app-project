"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';

import CustomUploadButton from './CustomUploadButton';

export default function Topnav() {
    const router = useRouter();

    const onUploadComplete = (urls: string[]) => {
        if (urls && urls.length > 0) {
            router.refresh();
            toast.success('照片上傳成功！');
        }
    };

    return (
        <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/10 border-b border-white/20">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <Link
                        href="/"
                        className="text-xl font-bold text-white hover:text-white/80 transition-colors"
                    >
                        T3 Photo Store
                    </Link>
                    <div className="flex items-center gap-4">
                        <SignedOut>
                            <SignInButton />
                        </SignedOut>
                        <SignedIn>
                            <CustomUploadButton
                                endpoint="imageUploader"
                                onUploadComplete={onUploadComplete}
                            />
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                    </div>
                </div>
            </div>
        </nav>
    );
}