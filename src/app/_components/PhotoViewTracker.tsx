'use client';

import { useEffect } from 'react';
import { trackPhotoView } from '~/utils/analytics';

export function PhotoViewTracker({ photoId }: { photoId: string }) {
    useEffect(() => {
        trackPhotoView(photoId);
    }, [photoId]);

    return null;
}