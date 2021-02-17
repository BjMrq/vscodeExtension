/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable no-tabs */
// eslint-disable-next-line import/no-unresolved
import { ProgressLocation, window } from "vscode";
import { Application } from "../spockeeApplications/applicationElement";
import { cliSendAction } from "../utils/cli";

export const installApplication = async ({
  applicationData: { folder },
}: Application): Promise<string> => {
  window.withProgress(
    { title: `Installing ${folder}`, location: ProgressLocation.Notification },
    async (progress) => {
      // token.onCancellationRequested(() => {
      // 	console.log("User canceled the long running operation");
      // });

      progress.report({ increment: 0 });

      progress.report({
        increment: 10,
        message: "I am long running! - still going...",
      });

      progress.report({
        increment: 40,
        message: "I am long running! - still going even more...",
      });

      await cliSendAction("git", "install", folder);

      setTimeout(() => {
        progress.report({
          increment: 50,
          message: "I am long running! - almost there...",
        });
      }, 3000);

      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 5000);
      });
    }
  );

  // const returned = cliSendAction("git", "install", folder);

  // if (returned.includes("Done")) {
  //   window.showInformationMessage(`${folder} was successfully installed`);
  //   updateAllSpockeeData();
  // } else {
  //   window.showErrorMessage(`Could not install ${folder}`);
  // }

  return "true";
};
