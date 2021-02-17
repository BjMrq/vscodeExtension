import { exec, spawnSync } from "child_process";
import { spockeeRoot } from "../config/constants";
import { promisify } from "util";

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

export const cliSendActionSync = (...cliArguments: string[]): string =>
  String.fromCharCode(
    ...((spawnSync("spockee", cliArguments, {
      env: { ...process.env, SPOCKEE_ROOT: spockeeRoot },
    }).stdout as unknown) as number[])
  );
