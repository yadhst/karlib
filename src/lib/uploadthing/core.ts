import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const routeHandler = createUploadthing();

export type UTFileRouterType = typeof UTFileRouter;
export const UTFileRouter = {
  pdfUploader: routeHandler({
    "application/pdf": {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      // Authorization logic goes here soon

      return {};
    })
    .onUploadComplete(({ file }) => {
      return { key: file.key };
    }),
} as const satisfies FileRouter;
