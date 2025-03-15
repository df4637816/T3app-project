import "server-only";
import { db } from ".";
import { auth } from "@clerk/nextjs/server";



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