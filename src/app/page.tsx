// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Image from "next/image";
import { db } from "~/server/db";

export const dynamic = "force-dynamic"


export default async function HomePage() {

  const images = await db.query.images.findMany({
    orderBy:(model,{desc}) => desc(model.id)
  });

  return (
    <main className="w-full flex justify-center items-center">
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
    </main>
  );
}
