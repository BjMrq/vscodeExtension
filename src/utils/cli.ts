import { exec } from "child_process";
import { spockeeEnvironments, spockeeRoot } from "../config/constants";
import { promisify } from "util";

const asyncExec = promisify(exec);

export const cliSendActionAsync = async (
  ...cliArguments: string[]
): Promise<string> => {
  try {
    const messageCli = await asyncExec(
      `spockee ${cliArguments.join(" ")} --code`,
      {
        env: spockeeEnvironments,
      }
    );

    if (messageCli.stderr) return messageCli.stderr;

    return messageCli.stdout;
  } catch (error) {
    return (error as Error).message;
  }
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
