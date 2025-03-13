import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

import { auth } from "@/lib/authentication/handler";

const routeHandler = createUploadthing();

export type UTFileRouterType = typeof UTFileRouter;
export const UTFileRouter = {
  pdfUploader: routeHandler({
    "application/pdf": {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const session = await auth();
      if (!session?.user)
        throw new UploadThingError("You are not authenticated");

      const validRoles = ["Admin", "Consultant"];
      if (!validRoles.includes(session.user.role))
        throw new UploadThingError(
          "You are not allowed to perform this action",
        );

      return { user: session.user };
    })
    .onUploadComplete(({ file, metadata }) => {
      return {
        key: file.key,
        user: {
          ...metadata.user,
          createdTimestamp: metadata.user.createdTimestamp.getTime(),
          emailVerified: null,
        },
      };
    }),
} as const satisfies FileRouter;
