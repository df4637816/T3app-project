// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Image from "next/image";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getMyImages } from "~/server/db/queries";
import Link from "next/link";



export const dynamic = "force-dynamic"

async function Images(){
   
    const images = await getMyImages();
 
   return(
    <div className="flex flex-wrap justify-center gap-4 p-4">
  {images.map((image) => (
    <div className="flex flex-col w-48" key={image.id}>
      <Link href={`/photos/${image.id}`}>
        <div className="h-64 w-52  overflow-hidden">
          <Image
            priority={false}
            loading="lazy"
            src={image.url}
            alt={image.name}
            className="object-cover mx-5 w-full h-full aspect-auto"
            width={208}
            height={256}
          />
        </div>
      </Link>
      <div>{image.id}.jpg</div>
    </div>
  ))}
</div>
   )
}

export default async function HomePage() {

  

  return (
    <main className="w-full flex justify-center items-center">
      <SignedOut>
        <div className="h-full w-ful text-2xl">Please sign in above</div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
