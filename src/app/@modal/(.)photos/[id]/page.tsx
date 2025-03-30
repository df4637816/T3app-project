
import Modal from "./modal";
import FullpageImage from "~/app/_components/FullpageImage";

export default async function PhotoModal({params: {id: photoId}}:{params: {id: string}}) {
    const idAsNumber = Number(photoId);
    if(Number.isNaN(idAsNumber)) throw new Error("Invalid photo id")
    return (
        <Modal>
            <FullpageImage id={idAsNumber}/>
        </Modal>
    );
}
