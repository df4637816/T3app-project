import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/server";
import { UploadThingError } from "uploadthing/server";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";
import { analyzeImage } from "~/server/services/vision";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 40 } })
    .middleware(async ({ req }) => {
      const user = await auth();
      if (!user.userId) throw new Error("Unauthorized");
      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        // 分析圖片內容
        const analysis = await analyzeImage(file.url);
        
        // 儲存圖片資訊到資料庫
        await db.insert(images).values({
          userId: metadata.userId,
          name: file.name,
          url: file.url,
          contentTags: JSON.stringify(analysis),
        });

        return { uploadedBy: metadata.userId };
      } catch (error) {
        console.error("Error processing upload:", error);
        throw new Error(`UploadThingError: Failed to process upload: ${error instanceof Error ? error.message : String(error)}`);
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
