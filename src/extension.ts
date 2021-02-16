/* eslint-disable max-statements */
// eslint-disable-next-line import/no-unresolved
import * as vscode from "vscode";
import { SpockeeCLITree } from "./cli/spockeeCliTree";
import { SpockeeDockerGroupTree } from "./docker/spockeeDockerTree";
import { InstalledApplicationsTree } from "./installedApplication/installedApplicationsTree";
import { SpockeeApplicationsTree } from "./spockeeApplications/spockeeApplicationsTree";
import { isSpockeeCliInstalled, openInCode } from "./utils/cli";
import { getSpockeeData, updateTreesState } from "./utils/data";

// eslint-disable-next-line import/no-unused-modules
export function activate() {
  if (isSpockeeCliInstalled()) {
    const spockeeData = getSpockeeData();

    // CLI
    vscode.window.createTreeView("spockeeCli", {
      treeDataProvider: new SpockeeCLITree(),
    });

    // Docker
    const treeDataProvider = new SpockeeDockerGroupTree(spockeeData);

    vscode.window.createTreeView("spockeeDockerGroup", {
      treeDataProvider,
    });

    // Installed applications
    const installedApplication = new InstalledApplicationsTree(spockeeData);

    vscode.window.createTreeView("installedApplications", {
      treeDataProvider: installedApplication,
    });

    // All spockee applications
    const spockeeApplications = new SpockeeApplicationsTree(spockeeData);

    vscode.window.createTreeView("spockeeApplications", {
      treeDataProvider: spockeeApplications,
    });

    // Commands
    // Refresh data
    vscode.commands.registerCommand("spockeeData.refreshEntry", () =>
      updateTreesState(installedApplication, spockeeApplications)
    );

    // Open in code
    vscode.commands.registerCommand("spockeeApp.openInCode", openInCode);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    vscode.window.showErrorMessage(
      "You do not have the @spockee/cli installed"
    );
  }
}

// this method is called when your extension is deactivated
// eslint-disable-next-line import/no-unused-modules
export function deactivate() {}
