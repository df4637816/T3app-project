import { getMyImage } from "~/server/db/queries";
import Image from "next/image";
import PhotoDescription from "~/app/_components/PhotoDescription";

export default async function FullpageImage(props:{photoId:string}){
        const idAsNumber =  Number(props.photoId);
        const image = await getMyImage(idAsNumber);
        return  <div className="bg-gray-900/85 rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-700">
        {/* 照片顯示區域 - 左側 */}
        <div className="md:w-2/3 flex justify-center items-center p-3 bg-black/50">
            <Image  
                priority={true} 
                src={image.url} 
                alt={image.name} 
                className="object-contain max-h-[70vh] rounded shadow-md"
                width={800}
                height={600} 
            />
        </div>
        
        {/* 照片信息和說明文字區域 - 右側 */}
        <div className="md:w-1/3 p-6 bg-gray-800/90">
            <h1 className="text-3xl text-white font-bold mb-2 drop-shadow-sm">{image.name}</h1>
            <div className="text-sm text-cyan-200 font-medium mb-4">
                上傳時間: {new Date(image.createdAt).toLocaleString()}
            </div>
            
            {/* 說明文字區塊 */}
            <div className="mb-3 text-amber-100 font-medium">照片說明：</div>
            <div className="bg-gray-700/80 p-4 rounded-lg shadow-inner text-black">
                <PhotoDescription 
                    photoId={idAsNumber} 
                    initialDescription={image.description ?? ""} 
                />
            </div>
        </div>
    </div>
};