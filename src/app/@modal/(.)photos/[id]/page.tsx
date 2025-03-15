import { getMyImage } from "~/server/db/queries";
import Image from "next/image";
export default async function PhotoModal({params: {id: photoId}}:{params: {id: string}}) {
    const idAsNumber = Number(photoId);
    const image = await getMyImage(idAsNumber);
    return (
        <div className="flex justify-center items-center w-full h-full ">
            <Image  priority={true} src={image.url} 
                         alt={image.name} 
                         className="object-cover"
                         width={500}
                         height={500} 
                          />
        </div>
    );
}
