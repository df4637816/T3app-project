//import FullpageImage from "~/app/_components/FullpageImage";
import Image from "next/image";
import PhotoDescription from "~/app/_components/PhotoDescription";
import { Button } from "~/components/ui/button";
import dayjs from "dayjs";

export default async function PhotoPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const { id: photoId } = params;

  const photo = {
    url: "/path/to/photo.jpg", // Replace with actual photo URL
    description: "A beautiful photo", // Replace with actual description
    createdAt: new Date().toISOString(), // Replace with actual creation date
    userId: "123", // Replace with actual user ID
  };

  const currentUser = {
    id: "123", // Replace with actual current user ID
  };

  const handleDelete = () => {
    console.log("Delete photo"); // Replace with actual delete logic
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative aspect-square">
            <Image
              src={photo.url}
              alt={photo.description || "照片"}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="p-6 flex flex-col">
            <div className="mb-auto">
              <h1 className="text-2xl font-bold text-white mb-4">照片詳情</h1>
              <PhotoDescription photoId={parseInt(photoId, 10)} initialDescription={photo.description} />
            </div>
            <div className="mt-6 flex flex-col gap-4">
              <p className="text-white/60 text-sm">
                上傳時間：{dayjs(photo.createdAt).format("YYYY/MM/DD HH:mm")}
              </p>
              {photo.userId === currentUser?.id && (
                <Button
                  variant="destructive"
                  className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400"
                  onClick={handleDelete}
                >
                  刪除照片
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}