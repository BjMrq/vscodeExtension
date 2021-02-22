import * as vscode from "vscode";
import { registerCommands } from "./commands";
import { registerTrees } from "./trees";
import {
  getSpockeeApplicationData,
  getSpockeeStateData,
  updateApplicationTreesState,
  updateStateTreesState,
} from "./utils/data";
import { checkForUpdates } from "./utils/update";

// eslint-disable-next-line import/no-unused-modules
export async function activate() {
  const spockeeApplicationData = await getSpockeeApplicationData();

  if (spockeeApplicationData.applicationList) {
    registerTrees();

    registerCommands();

    await updateApplicationTreesState(spockeeApplicationData);

    const spockeeStateData = await getSpockeeStateData();

    await updateStateTreesState(spockeeStateData);

    await checkForUpdates();
  } else {
    vscode.window.showErrorMessage(
      "You do not have the @spockee/cli installed"
    );
  }
}

// eslint-disable-next-line import/no-unused-modules
export function deactivate() {}
