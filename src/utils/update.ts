import { window, ProgressLocation } from "vscode";
import { simpleExec } from "./cli";
import { getSpockeeVersionData } from "./data";

export const checkForUpdates = async () => {
  const { cliVersion } = await getSpockeeVersionData();

  if (cliVersion.needUpdate) {
    const userWantsToUpdate = await window.showInformationMessage(
      "An update is available for @spockee/cli",
      "Update",
      "Cancel"
    );

    if (userWantsToUpdate === "Update") {
      window.withProgress(
        {
          title: "Updating @spockee/cli",
          location: ProgressLocation.Notification,
        },
        async () => {
          await simpleExec("npm i -g @spockee/cli");

          return await new Promise<void>((resolve) => {
            resolve();
          });
        }
      );

      window.showInformationMessage(
        `What is new: \n\n ${cliVersion.changelog
          .split(",")
          .map((change) => change.replace(/^ /u, ""))
          .map((change, index) => `  ${index + 1}. ${change}`)
          .join("\n\n")}`,
        { modal: true }
      );
    }
  }
};
