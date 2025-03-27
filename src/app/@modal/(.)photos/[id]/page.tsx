import { getMyImage } from "~/server/db/queries";
import Modal from "./modal";
import Image from "next/image";
import PhotoDescription from "~/app/_components/PhotoDescription";

export default async function PhotoModal({params: {id: photoId}}:{params: {id: string}}) {
    const idAsNumber = Number(photoId);
    const image = await getMyImage(idAsNumber);
    return (
        <Modal>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* 照片显示区域 */}
                <div className="flex justify-center">
                    <Image  
                        priority={true} 
                        src={image.url} 
                        alt={image.name} 
                        className="object-cover"
                        width={800}
                        height={600} 
                    />
                </div>
                
                {/* 照片信息和说明文字区域 */}
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-2">{image.name}</h1>
                    <div className="text-sm text-gray-500 mb-4">
                        上傳時間: {new Date(image.createdAt).toLocaleString()}
                    </div>
                    
                    {/* 客户端组件处理说明文字编辑 */}
                    <PhotoDescription 
                        photoId={idAsNumber} 
                        initialDescription={image.description ?? ""} 
                    />
                </div>
            </div>
        </Modal>
            
    );
}
