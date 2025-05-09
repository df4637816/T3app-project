import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { deleteImage } from "~/server/db/queries";

export async function DELETE(request: Request, props: { params: { id: string } }) {
  try {
    const { id } = props.params;
    const session = await auth();
    
    if (!session?.userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const imageId = Number(id);
    if (isNaN(imageId)) {
      return new NextResponse("Invalid image ID", { status: 400 });
    }

    await deleteImage(imageId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting image:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}