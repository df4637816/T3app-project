import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import dayjs from "dayjs";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";

type ImageType = {
  id: string;
  url: string;
  description?: string;
  createdAt: string;
  userId: string;
};

type ImageCardProps = {
  image: ImageType;
  currentUserId: string;
  handleDelete: () => void;
};

export default function ImageCard({ image, currentUserId, handleDelete }: ImageCardProps) {
  const { url, description, createdAt, userId } = image;

  return (
   
    <Card className="group relative overflow-hidden rounded-xl transition-transform hover:scale-[1.02] hover:shadow-xl bg-white/10 backdrop-blur-md border-white/20">
      <div  className="aspect-square relative">
        <Link href={`/photos/${image.id}`} >
        <Image
          src={url}
          alt={description ?? "照片"}
          width={500}
          height={500}
          className="object-cover transition-all duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        </Link>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white text-sm font-medium line-clamp-1">{description ?? "無描述"}</p>
            <p className="text-white/70 text-xs">{dayjs(createdAt).format("YYYY/MM/DD")}</p>
          </div>
          {userId === currentUserId && (
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-white/20"
              onClick={handleDelete}
            >
              <Trash2 className="h-5 w-5 text-white" />
            </Button>
          )}
        </div>
      </div>
    </Card>
    
  );
}