import { spawn } from "child_process";
import { spockeeRoot } from "../config/constants";
import { Application } from "../spockeeApplications/applicationElement";

export const openInCode = ({ applicationData }: Application) => {
  spawn("code", ["."], {
    cwd: `${spockeeRoot}/${applicationData.folder}`,
  });
};


import { exec } from "child_process";
import { promisify } from "util";
import { spockeeRoot } from "../config/constants";

const asyncSpawn = promisify(exec);

export const cliSendActionAsync = async (
  ...cliArguments: string[]
): Promise<string> => {
  const messageCli = await asyncSpawn(`spockee ${cliArguments.join(" ")}`, {
    env: { ...process.env, SPOCKEE_ROOT: spockeeRoot },
  });

  if (messageCli.stdout) return messageCli.stdout;

  if (messageCli.stderr) return messageCli.stderr;

  return "An error happened with the cli";
};