import { ProgressLocation, window } from "vscode";
import { DockerGroup } from "../trees/docker/dockerGroup";
import { StateContainer } from "../trees/state/stateContainer";
import { DockerStateGroup } from "../trees/state/stateDockerGroup";
import { cliSendActionAsync } from "../utils/cli";
import { updateStateTreesState } from "../utils/data";
import { createTask } from "../utils/task";
import { openInCode } from "./openInCode";

export const attachLogsDockerGroupStateLog = async ({
  dockerGroupData,
}: DockerStateGroup) => {
  await createTask(
    `${dockerGroupData.name} logs`,
    `${dockerGroupData.command} logs -f --tail="600"`,
    false
  );
};

export const attachLogsDockerContainerState = async ({
  stateContainerData: { dockerGroup, containerName },
}: StateContainer) => {
  await createTask(
    `${containerName} logs`,
    `${dockerGroup.command} logs -f --tail="600" ${containerName}`,
    false
  );
};

export const startShellDockerContainerState = async ({
  stateContainerData: { containerName },
}: StateContainer) => {
  await createTask(
    `${containerName} shell`,
    `spockee docker ${containerName} sh`,
    true
  );
};

export const refreshDependenciesDockerContainerState = async ({
  stateContainerData: { containerName },
}: StateContainer) => {
  await createTask(
    `${containerName} refresh dependencies`,
    `spockee docker ${containerName} install`,
    true
  );
};

export const installDependencyDockerContainerState = async ({
  stateContainerData: { containerName },
}: StateContainer) => {
  const dependencyToInstall = (await window.showInputBox({
    prompt: "Enter the dependency to install",
  })) as string;

  if (dependencyToInstall) {
    await createTask(
      `${containerName} install ${dependencyToInstall}`,
      `spockee docker ${containerName} install ${dependencyToInstall}`,
      true
    );
  }
};

export const basicDockerCleanUp = async () => {
  void window.withProgress(
    { title: "Cleaning up Docker", location: ProgressLocation.Notification },
    async (progress) => {
      setTimeout(() => {
        progress.report({
          increment: 40,
          message: "Removing dangling images",
        });
      }, 3000);

      setTimeout(() => {
        progress.report({
          increment: 60,
          message: "Removing unnamed volumes",
        });
      }, 7000);

      await cliSendActionAsync("docker", "basic-cleanUp");

      await updateStateTreesState();

      return new Promise<void>((resolve) => {
        resolve();
      });
    }
  );
};

export const dockerStopAndRemove = async () => {
  void window.withProgress(
    {
      title: "Stop and remove containers",
      location: ProgressLocation.Notification,
    },
    async (progress) => {
      setTimeout(() => {
        progress.report({
          increment: 40,
          message: "Stopping all containers",
        });
      }, 3000);

      setTimeout(() => {
        progress.report({
          increment: 60,
          message: "Removing all containers",
        });
      }, 7000);

      await cliSendActionAsync("docker", "stop-and-remove");

      await updateStateTreesState();

      return new Promise<void>((resolve) => {
        resolve();
      });
    }
  );
};

export const startDockerComposeGroup = (addFlag: boolean) => async ({
  dockerGroupData: { name: dockerGroupName, command: dockerGroupCommand },
}: DockerGroup) => {
  try {
    const composeFlag = addFlag
      ? (await window.showInputBox({
          prompt: "Add flag while composing docker group",
        })) || ""
      : "";

    await window.withProgress(
      {
        title: `Start ${dockerGroupName} compose group`,
        location: ProgressLocation.Notification,
      },
      async (progress) => {
        setTimeout(() => {
          progress.report({
            increment: 20,
            message: "Pulling latest changes",
          });
        }, 2000);

        setTimeout(() => {
          progress.report({
            increment: 20,
            message: "Verifying dependencies",
          });
        }, 6000);

        setTimeout(() => {
          progress.report({
            increment: 40,
            message: "Starting containers",
          });
        }, 8000);

        const cliComposeResult = await cliSendActionAsync(
          "docker",
          `compose-${dockerGroupName}`,
          composeFlag,
          "--detach"
        );

        await updateStateTreesState();

        return await new Promise<string>((resolve, reject) => {
          if (cliComposeResult.includes("failed")) {
            reject(cliComposeResult);
          } else {
            resolve(cliComposeResult);
          }
        });
      }
    );

    await createTask(
      `${dockerGroupName} logs`,
      `${dockerGroupCommand} logs -f --tail="600"`,
      false,
      async () => {
        await updateStateTreesState();
      }
    );
  } catch (error) {
    console.log(error);
    window.showErrorMessage(error);
  }
};

export const openComposeConfig = async ({ dockerGroupData }: DockerGroup) => {
  await openInCode(dockerGroupData.file);
};

export const openComposeVariable = async () => {
  await openInCode(".env");
};
