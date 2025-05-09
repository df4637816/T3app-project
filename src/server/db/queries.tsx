import "server-only";
import { db } from ".";
import { auth } from "@clerk/nextjs/server";
import { images } from "./schema";
import { eq, and } from "drizzle-orm";

export async function getMyImages(){
     const {userId} = await auth();

     if(!userId) throw new Error("Unauthorized");

    const images = await db.query.images.findMany({
        where: (model,{eq})=> eq(model.userId,userId),
        orderBy: (model, {desc}) => desc(model.id),
    })

    return images;
}

export async function getMyImage(id: number){
    const {userId} = await auth();

    if(!userId) throw new Error("Unauthorized");

    const image = await db.query.images.findFirst({
        where: (model,{and,eq})=> and(eq(model.userId,userId),eq(model.id,id))
    })
    if(!image) throw new Error("Image not found");
    return image;
}

export async function updateImageDescription(id: number, description: string){
    const {userId} = await auth();
    if(!userId) throw new Error("Unauthorized");

    await db.update(images).set({description}).where(eq(images.id,id));
}

export async function deleteImage(id: number) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    await db.delete(images).where(
        and(
            eq(images.id, id),
            eq(images.userId, userId)
        )
    );
}