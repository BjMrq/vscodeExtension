/* eslint-disable promise/avoid-new */
/* eslint-disable no-void */
/* eslint-disable @typescript-eslint/require-await */
// eslint-disable-next-line import/no-unresolved
import { ProgressLocation, window } from "vscode";
import { Application } from "../spockeeApplications/applicationElement";
import { cliSendActionAsync } from "../utils/cli";
import { updateApplicationTreesState } from "../utils/data";

export const installApplication = async ({
  applicationData: { folder },
}: Application): Promise<void> => {
  void window.withProgress(
    { title: `Installing ${folder}`, location: ProgressLocation.Notification },
    async (progress) => {
      progress.report({
        increment: 20,
        message: "Cloning repository",
      });

      setTimeout(() => {
        progress.report({
          increment: 40,
          message: "Installing dependencies",
        });
      }, 3000);

      setTimeout(() => {
        progress.report({
          increment: 40,
          message: "Updating environment variables",
        });
      }, 6000);

      await cliSendActionAsync("git", "install", folder);

      updateApplicationTreesState();

      return new Promise<void>((resolve) => {
        resolve();
      });
    }
  );
};
