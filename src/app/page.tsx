// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Image from "next/image";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getMyImages } from "~/server/db/queries";



export const dynamic = "force-dynamic"

async function Images(){
   
    const images = await getMyImages();
 
   return(
    <div className="flex flex-wrap justify-center gap-4">
      
      {
        images.map((image)=>(
            <div className="flex flex-col w-[250px] h-[250px] " key={image.id}>
              <Image  priority={true} src={image.url} 
              alt={image.name} 
              className="object-cover w-full h-full"
              width={480}
              height={480} 
               />
              <div>{image.id}.jpg</div>
            </div>
        ))
      }
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
