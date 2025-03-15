

export default function PhotoPage({params: {id: photoId}}:{params: {id: string}}) {
    return (
        <div className="flex justify-center">
           {photoId} 
        </div>
    );
}