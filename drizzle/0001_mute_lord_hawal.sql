ALTER TABLE "t3app_image" ADD COLUMN "description" varchar(1024);--> statement-breakpoint
ALTER TABLE "t3app_image" ADD COLUMN "content_tags" text;--> statement-breakpoint
CREATE INDEX "content_tags_idx" ON "t3app_image" USING btree ("content_tags");