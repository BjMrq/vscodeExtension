import { spawnSync, spawn } from "child_process";
import { spockeeRoot } from "../config/constants";
import { Application } from "../spockeeApplications/applicationElement";

export const isSpockeeCliInstalled = (): boolean => {
  const cliCommandTest = spawnSync("spockee", ["--help"], {
    env: { ...process.env, SPOCKEE_ROOT: spockeeRoot },
  }).stdout;

  return String.fromCharCode(
    ...((cliCommandTest as unknown) as number[])
  ).includes("You can run one of the following commands:");
};

export const openInCode = ({ applicationData }: Application) => {
  spawn("code", ["."], {
    cwd: `${spockeeRoot}/${applicationData.folder}`,
  });
};
