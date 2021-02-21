import { exec, spawnSync } from "child_process";
import { spockeeEnvironments, spockeeRoot } from "../config/constants";
import { promisify } from "util";

const asyncExec = promisify(exec);

export const cliSendActionAsync = async (
  ...cliArguments: string[]
): Promise<string> => {
  const messageCli = await asyncExec(
    `spockee ${cliArguments.join(" ")} --code`,
    {
      env: spockeeEnvironments,
    }
  );

  if (messageCli.stdout) return messageCli.stdout;

  if (messageCli.stderr) return messageCli.stderr;

  return "An error happened with the cli";
};

export const simpleExec = async (
  ...cliArguments: string[]
): Promise<string> => {
  const messageCli = await asyncExec(String(cliArguments.join(" ")), {
    cwd: spockeeRoot,
    env: spockeeEnvironments,
  });

  if (messageCli.stderr) return messageCli.stderr;

  return messageCli.stdout;
};

export const cliSendActionSync = (...cliArguments: string[]): string =>
  String.fromCharCode(
    ...((spawnSync("spockee", [...cliArguments, "--code"], {
      env: { ...process.env, SPOCKEE_ROOT: spockeeRoot },
    }).stdout as unknown) as number[])
  );
