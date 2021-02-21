import { spawn } from "child_process";
import { spockeeRoot } from "../config/constants";
import { Application } from "../trees/spockeeApplications/applicationElement";

export const openInCode = ({ applicationData }: Application) => {
  spawn("code", ["."], {
    cwd: `${spockeeRoot}/${applicationData.folder}`,
  });
};
