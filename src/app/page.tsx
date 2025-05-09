import React, { Suspense } from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { getMyImages } from "~/server/db/queries";
import ImageCardWrapper from "./_components/ImageCardWrapper";
import LoadingGrid from "./_components/LoadingGrid";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

async function ImageGrid() {
  const session = await auth();
  if (!session?.userId) throw new Error("Unauthorized");
  
  const images = await getMyImages();
  const CHUNK_SIZE = 12;
  
  const chunkedImages = Array.from({ length: Math.ceil(images.length / CHUNK_SIZE) }, (_, i) =>
    images.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE)
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {chunkedImages[0]?.map((image) => (
        <Suspense 
          key={image.id} 
          fallback={<div className="w-48 h-64 bg-gray-200 animate-pulse rounded-lg" />}
        >
          <ImageCardWrapper 
            image={{
              ...image,
              id: image.id.toString(),
              description: image.description ?? undefined,
              createdAt: image.createdAt.toISOString()
            }}
            currentUserId={session.userId}
          />
        </Suspense>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="w-full flex justify-center items-center">
      <SignedOut>
        <div className="h-full w-full text-2xl">請先登入</div>
      </SignedOut>
      <SignedIn>
        <Suspense fallback={<LoadingGrid />}>
          <ImageGrid />
        </Suspense>
      </SignedIn>
    </main>
  );
}
