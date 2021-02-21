import * as path from "path";

export const getMediaPath = (mediaName: string) =>
  path.join(__filename, "..", "..", "..", "media", mediaName);
