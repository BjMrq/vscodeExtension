import { spawn } from "child_process";
import { spockeeRoot } from "../config/constants";
import { Application } from "../spockeeApplications/applicationElement";

export const openInCode = ({ applicationData }: Application) => {
  spawn("code", ["."], {
    cwd: `${spockeeRoot}/${applicationData.folder}`,
  });
};
