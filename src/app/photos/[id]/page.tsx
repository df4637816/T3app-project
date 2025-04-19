import FullpageImage from "~/app/_components/FullpageImage";


export default function PhotoPage({params: {id: photoId}}:{params: {id: string}}) {
    return (
        <div className="flex h-full min-h-0 w-full min-w-0 overflow-y-hidden">
       <FullpageImage photoId={photoId} />
      </div>
    );
}