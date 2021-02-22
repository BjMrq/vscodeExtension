import { window } from "vscode";
import { Argument } from "../trees/cli/Arguments";
import { Command } from "../trees/cli/Command";
import { createTask } from "../utils/task";

export const executeCommand = async ({
  cliCommand: {
    name: commandName,
    arguments: commandArguments,
    argumentRequired,
  },
}: Command): Promise<void> => {
  if (argumentRequired) {
    const selectedArgument = (await window.showQuickPick(
      Object.values(commandArguments).map((argument) => argument.value)
    )) as string;

    await createTask(
      `${commandName}-${selectedArgument}`,
      `spockee ${commandName} ${selectedArgument}`,
      true
    );
  } else {
    await createTask(String(commandName), `spockee ${commandName}`, true);
  }
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
