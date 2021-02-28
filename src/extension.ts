/* eslint-disable import/no-unused-modules */
import * as vscode from "vscode";
import { registerCommands } from "./commands";
import { registerTrees } from "./trees";
import {
  getSpockeeApplicationData,
  getSpockeeStateData,
  getSpockeeStoriesData,
  updateApplicationTreesState,
  updateStateTreesState,
  updateStoriesTreesState,
} from "./utils/data";
import { checkForUpdates } from "./utils/update";

// eslint-disable-next-line max-statements
export async function activate() {
  const spockeeApplicationData = await getSpockeeApplicationData();

  if (spockeeApplicationData.applicationList) {
    registerTrees();

    registerCommands();

    await updateApplicationTreesState(spockeeApplicationData);

    const spockeeStateData = await getSpockeeStateData();

    await updateStateTreesState(spockeeStateData);

    const spockeeStoriesData = await getSpockeeStoriesData();

    await updateStoriesTreesState(spockeeStoriesData);

    await checkForUpdates();
  } else {
    vscode.window.showErrorMessage(
      "You do not have the @spockee/cli installed"
    );
  }
}

export function deactivate() {}
