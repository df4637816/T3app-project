import Modal from "./modal";
import FullpageImage from "~/app/_components/FullpageImage";

type Props = {
  params: {
    id: string;
  };
};

export default async function PhotoModal({ params }: Props) {
  // 確保等待 params 解析完成
  const id = await Promise.resolve(params.id);
  
  if (!id || Number.isNaN(Number(id))) {
    throw new Error("Invalid photo id");
  }

  return (
    <Modal>
      <FullpageImage photoId={id} />
    </Modal>
  );
}
