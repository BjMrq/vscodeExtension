/* eslint-disable max-statements */
// eslint-disable-next-line import/no-unresolved
import * as vscode from "vscode";
import { openInCode } from "./actions/openInCode";
import { installApplication } from "./cli-actions/install";
import { spockeeTrees } from "./trees";
import { getSpockeeData, updateAllTreesState } from "./utils/data";

const {
  dockerGroups,
  cliActions,
  spockeeApplications,
  installedApplications,
} = spockeeTrees;

// eslint-disable-next-line import/no-unused-modules
export function activate() {
  const spockeeData = getSpockeeData();

  if (spockeeData.applicationList) {
    updateAllTreesState(spockeeData);

    // CLI
    vscode.window.createTreeView("spockeeCli", {
      treeDataProvider: cliActions,
    });

    // Docker

    vscode.window.createTreeView("spockeeDockerGroup", {
      treeDataProvider: dockerGroups,
    });

    // Installed applications

    vscode.window.createTreeView("installedApplications", {
      treeDataProvider: installedApplications,
    });

    // All spockee applications
    vscode.window.createTreeView("spockeeApplications", {
      treeDataProvider: spockeeApplications,
    });

    // Commands
    // Refresh data
    vscode.commands.registerCommand(
      "spockeeData.refreshEntry",
      updateAllTreesState
    );

    // Open in code
    vscode.commands.registerCommand("spockeeApp.openInCode", openInCode);
    // Install
    vscode.commands.registerCommand("spockeeApp.install", installApplication);
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
