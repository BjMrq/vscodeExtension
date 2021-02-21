/* eslint-disable max-statements */
import * as vscode from "vscode";
import { registerCommands } from "./commands";
import { registerTrees } from "./trees";
import { simpleExec } from "./utils/cli";
import {
  getSpockeeApplicationData,
  getSpockeeStateData,
  getSpockeeVersionData,
  updateApplicationTreesState,
  updateStateTreesState,
} from "./utils/data";

// eslint-disable-next-line import/no-unused-modules
export async function activate() {
  const spockeeApplicationData = await getSpockeeApplicationData();

  if (spockeeApplicationData.applicationList) {
    registerTrees();

    registerCommands();

    await updateApplicationTreesState(spockeeApplicationData);

    const spockeeStateData = await getSpockeeStateData();

    await updateStateTreesState(spockeeStateData);

    const { cliVersion } = await getSpockeeVersionData();

    if (cliVersion.needUpdate) {
      const userWantsToUpdate = await vscode.window.showInformationMessage(
        "An update is available for @spockee/cli",
        "Update",
        "Cancel"
      );

      if (userWantsToUpdate === "Update") {
        vscode.window.showInformationMessage(
          `What is new: \n\n ${cliVersion.changelog
            .split(",")
            .map((change) => change.replace(/^ /u, ""))
            .map((change, index) => `  ${index + 1}. ${change}`)
            .join("\n\n")}`,
          { modal: true }
        );

        await simpleExec("npm i -g @spockee/cli");
      }
    }
  } else {
    vscode.window.showErrorMessage(
      "You do not have the @spockee/cli installed"
    );
  }
}

// eslint-disable-next-line import/no-unused-modules
export function deactivate() {}
