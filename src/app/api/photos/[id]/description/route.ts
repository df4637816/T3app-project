import { NextResponse } from 'next/server';
import { updateImageDescription } from '~/server/db/queries';
import { auth } from '@clerk/nextjs/server';

export async function POST(request: Request, props: { params: { id: string } }) {
  try {
    const { id } = props.params;
    const session = await auth();
    if (!session?.userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { description } = (await request.json()) as { description: string };
    const photoId = Number(id);
    
    if (isNaN(photoId)) {
      return new NextResponse('Invalid image ID', { status: 400 });
    }

    await updateImageDescription(photoId, description);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating photo description:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}