import { Task, TaskScope, ShellExecution, tasks } from "vscode";
import { spockeeRoot, spockeeEnvironments } from "../config/constants";

export const createTask = async (
  taskName: string,
  command: string,
  isCliCommand: boolean,
  onTaskFinish?: () => Promise<void>
  // eslint-disable-next-line max-params
) => {
  const task = new Task(
    { type: "shell" },
    TaskScope.Workspace,
    taskName,
    "Spockee extension",
    new ShellExecution(`${command} ${isCliCommand ? "--code" : ""}`, {
      cwd: spockeeRoot,
      env: spockeeEnvironments,
    }),
    []
  );

  task.presentationOptions = {
    focus: true,
  };

  const taskExecution = await tasks.executeTask(task);

  return await new Promise<void>((resolve) => {
    const disposable = tasks.onDidEndTaskProcess(async (processEndEvent) => {
      if (onTaskFinish) await onTaskFinish();

      if (processEndEvent.execution === taskExecution) {
        disposable.dispose();

        resolve();
      }
    });
  });
};
