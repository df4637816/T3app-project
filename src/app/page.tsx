// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Image from "next/image";
import { db } from "~/server/db";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export const dynamic = "force-dynamic"

async function Images(){
  const images = await db.query.images.findMany({
    orderBy:(model,{desc}) => desc(model.id)
  });
   return(
    <div className="flex flex-wrap justify-center gap-2">
      
      {
        [...images,...images,...images].map((image,index)=>(
            <div className="flex flex-col" key={image.id + "-" + index}>
              <Image   src={image.url} alt={"image"} width={250} height={100}    style={{objectFit: "cover",aspectRatio:'1/1'}}/>
              <div>{image.name}</div>
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
