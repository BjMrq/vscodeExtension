/* eslint-disable max-statements */
import { commands } from "vscode";
import { openInCode } from "./commands/openInCode";
import {
  editSpockeeSettings,
  executeCommand,
  executeCommandWithArgument,
  startSpockee,
  stopSpockee,
} from "./commands/cli";
import {
  updateApplicationTreesState,
  updateStateTreesState,
} from "./utils/data";
import {
  attachLogsDockerContainerState,
  attachLogsDockerGroupStateLog,
  basicDockerCleanUp,
  dockerStopAndRemove,
  installDependencyDockerContainerState,
  openComposeConfig,
  openComposeVariable,
  refreshDependenciesDockerContainerState,
  startDockerComposeGroup,
  startShellDockerContainerState,
} from "./commands/docker";
import { uninstallApplication } from "./commands/uninstall";
import {
  cleanMergedBranches,
  installApplication,
  pullLatest,
} from "./commands/git";

export const registerCommands = () => {
  // Commands

  // Applications
  commands.registerCommand(
    "spockeeApplicationData.refreshEntry",
    updateApplicationTreesState
  );
  commands.registerCommand(
    "spockeeInstalledApplications.cleanMerged",
    cleanMergedBranches
  );
  commands.registerCommand(
    "spockeeInstalledApplications.pullChanges",
    pullLatest
  );

  // State
  commands.registerCommand(
    "spockeeStateData.refreshEntry",
    updateStateTreesState
  );

  // Open in code
  commands.registerCommand("spockeeApp.openInCode", openInCode);

  // Uninstall
  commands.registerCommand(
    "spockeeApp.uninstallApplication",
    uninstallApplication
  );

  // CLI
  commands.registerCommand("spockeeCli.runCommand", executeCommand);
  commands.registerCommand(
    "spockeeCli.runCommandWithArgument",
    executeCommandWithArgument
  );
  commands.registerCommand("spockeeCli.editSettings", editSpockeeSettings);
  commands.registerCommand("spockeeCli.startSpockee", startSpockee);
  commands.registerCommand("spockeeCli.stopSpockee", stopSpockee);

  // Install
  commands.registerCommand("spockeeApp.install", installApplication);

  // Docker
  commands.registerCommand("dockerGroup.openComposeConfig", openComposeConfig);
  commands.registerCommand("dockerGroup.startCompose", startDockerComposeGroup);
  commands.registerCommand("dockerGroup.envConfig", openComposeVariable);

  // State

  // Tree
  commands.registerCommand("dockerState.removeContainers", dockerStopAndRemove);
  commands.registerCommand("dockerState.cleanUp", basicDockerCleanUp);

  // Elements

  // Attach docker logs
  // Docker group
  commands.registerCommand(
    "dockerStateGroup.attachLogs",
    attachLogsDockerGroupStateLog
  );

  // Container
  commands.registerCommand(
    "dockerStateContainer.attachLogs",
    attachLogsDockerContainerState
  );

  // Start shell
  commands.registerCommand(
    "dockerStateContainer.startShell",
    startShellDockerContainerState
  );

  // Refresh dependencies
  commands.registerCommand(
    "dockerStateContainer.refreshDependencies",
    refreshDependenciesDockerContainerState
  );

  // Install dependency
  commands.registerCommand(
    "dockerStateContainer.installDependency",
    installDependencyDockerContainerState
  );
};
