import { Argument } from "../trees/cli/Arguments";
import { Command } from "../trees/cli/Command";
import { createTask } from "../utils/task";

export const executeCommand = async ({
  cliCommand,
}: Command): Promise<void> => {
  await createTask(String(cliCommand.name), `spockee ${cliCommand.name}`, true);
};

export const executeCommandWithArgument = async ({
  argumentData: { commandName, value },
}: Argument): Promise<void> => {
  await createTask(
    `${commandName}-${value}`,
    `spockee ${commandName} ${value}`,
    true
  );
};
