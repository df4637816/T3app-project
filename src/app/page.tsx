// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Link from "next/link";
import Image from "next/image";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";
const mockUrl = [
  "https://utfs.io/f/a44207b0-f7bf-4af1-9fc2-408a0420ea9b-2xgg1h.png",
  "https://utfs.io/f/3d50bf61-0bc6-43fb-85ee-1319608a585e-erwkck.JPG",
  "https://utfs.io/f/fbe7f54d-a3f4-4dce-90e3-d3405d5a84e0-y8inzg.JPG",
  "https://utfs.io/f/5169f794-e920-4a6a-b82e-a09f61803a16-6b64nn.JPG",
]

const mocklImages = mockUrl.map((url:string,index:number) => (
   {
    id:index + 1,
    url
   }
))

export default async function HomePage() {

  const posts = await db.query.posts.findMany();

  return (
    <main className="w-full flex justify-center items-center">
    <div className="flex flex-wrap justify-center gap-2">
      {posts.map((post)=> (<div key={post.id}>{post.name}</div>))}
      {
        [...mocklImages,...mocklImages,...mocklImages].map((images,index)=>(
            <div className="" key={images.id + "-" + index}>
              <Image   src={images.url} alt={"image"} width={250} height={100}    style={{objectFit: "cover",aspectRatio:'1/1'}}/>
           </div>
        ))
      }
    </div>
    </main>
  );
}
