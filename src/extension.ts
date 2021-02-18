/* eslint-disable max-statements */
// eslint-disable-next-line import/no-unresolved
import * as vscode from "vscode";
import { openInCode } from "./actions/openInCode";
import { installApplication } from "./cli-actions/install";
import { spockeeTrees } from "./trees";
import {
  getSpockeeApplicationData,
  getSpockeeStateData,
  updateApplicationTreesState,
  updateStateTreesState,
} from "./utils/data";

const {
  dockerGroups: { tree: dockerGroupsTree },
  cliActions: { tree: cliActionsTree },
  spockeeApplications: { tree: spockeeApplicationsTree },
  installedApplications: { tree: installedApplicationsTree },
  spockeeState: { tree: spockeeStateTree },
} = spockeeTrees;

// eslint-disable-next-line import/no-unused-modules
export function activate() {
  const spockeeApplicationData = getSpockeeApplicationData();
  const spockeeStateData = getSpockeeStateData();

  if (spockeeApplicationData.applicationList) {
    updateApplicationTreesState(spockeeApplicationData);
    updateStateTreesState(spockeeStateData);

    // CLI
    vscode.window.createTreeView("spockeeCli", {
      treeDataProvider: cliActionsTree,
    });

    // State
    vscode.window.createTreeView("spockeeDockerState", {
      treeDataProvider: spockeeStateTree,
    });

    // Docker
    vscode.window.createTreeView("spockeeDockerGroup", {
      treeDataProvider: dockerGroupsTree,
    });

    // Installed applications
    vscode.window.createTreeView("installedApplications", {
      treeDataProvider: installedApplicationsTree,
    });

    // All spockee applications
    vscode.window.createTreeView("spockeeApplications", {
      treeDataProvider: spockeeApplicationsTree,
    });

    // Commands
    // Refresh data
    vscode.commands.registerCommand(
      "spockeeApplicationData.refreshEntry",
      updateApplicationTreesState
    );

    vscode.commands.registerCommand(
      "spockeeStateData.refreshEntry",
      updateStateTreesState
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
