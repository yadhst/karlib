import { createRouteHandler } from "uploadthing/next";

import { UTFileRouter } from "@/lib/uploadthing/core";

export const { GET, POST } = createRouteHandler({
  router: UTFileRouter,
});
