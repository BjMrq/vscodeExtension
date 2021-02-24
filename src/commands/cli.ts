import { ProgressLocation, window } from "vscode";
import { settingsFilePath } from "../config/constants";
import { Argument } from "../trees/cli/Arguments";
import { Command } from "../trees/cli/Command";
import { cliSendActionAsync, simpleExec } from "../utils/cli";
import { updateStateTreesState } from "../utils/data";
import { getSpockeeSettings } from "../utils/settings";
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

export const startSpockee = async (): Promise<void> => {
  const selectedSystem = (await window.showQuickPick([
    "android",
    "ios",
  ])) as string;

  const startFlags = (await window.showInputBox({
    prompt: "Enter flags to include for start command",
    value: await getSpockeeSettings("startFlags"),
  })) as string;

  await createTask(
    "Spockee start part",
    `spockee code-start ${selectedSystem} one ${startFlags}`,
    true
  );

  updateStateTreesState();

  await createTask(
    "Spockee start",
    `spockee code-start ${selectedSystem} two ${startFlags}`,
    true,
    async () => {
      await updateStateTreesState();
    }
  );
};

export const stopSpockee = async (): Promise<void> => {
  window.withProgress(
    {
      title: "Terminating Spockee applications",
      location: ProgressLocation.Notification,
    },
    async () => {
      await cliSendActionAsync("terminate");

      await updateStateTreesState();

      return await new Promise<void>((resolve) => {
        resolve();
      });
    }
  );
};

export const editSpockeeSettings = async () => {
  await simpleExec(`code ${settingsFilePath}`);
};
