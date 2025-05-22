import posthog from 'posthog-js';

export const trackPhotoUpload = (photoId: string, url: string) => {
  posthog.capture('photo_uploaded', {
    photo_id: photoId,
    photo_url: url
  });
};

export const trackPhotoView = (photoId: string) => {
  posthog.capture('photo_viewed', {
    photo_id: photoId
  });
};

export const trackPhotoDelete = (photoId: string) => {
  posthog.capture('photo_deleted', {
    photo_id: photoId
  });
};

export const trackDescriptionUpdate = (photoId: string) => {
  posthog.capture('description_updated', {
    photo_id: photoId
  });
};