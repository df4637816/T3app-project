'use client';

import { useRouter } from 'next/navigation';
import ImageCard from './ImageCard';
import { toast } from 'sonner';
import { trackPhotoDelete } from '~/utils/analytics';

interface ImageCardWrapperProps {
  image: {
    id: string;
    description: string | undefined;
    createdAt: string;
    name: string;
    url: string;
    userId: string;
  };
  currentUserId: string;
}

export default function ImageCardWrapper({ image, currentUserId }: ImageCardWrapperProps) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/photos/${image.id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete image');
      
      trackPhotoDelete(image.id);
      toast.success('照片已成功刪除');
      router.refresh();
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('刪除照片失敗，請稍後再試');
    }
  };

  return (
    <ImageCard
      image={image}
      currentUserId={currentUserId}
      handleDelete={handleDelete}
    />
  );
}