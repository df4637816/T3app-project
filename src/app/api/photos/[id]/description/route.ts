import { NextResponse } from 'next/server';
import { updateImageDescription } from '~/server/db/queries';
import { auth } from '@clerk/nextjs/server';


export async function POST(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const session = await auth();
    if (!session?.userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { description } = (await request.json()) as { description: string };
    const photoId = Number(params.id);

    await updateImageDescription(photoId, description);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating photo description:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}