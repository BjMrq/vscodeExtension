import { window } from "vscode";
import { Application } from "../trees/spockeeApplications/applicationElement";
import { simpleExec } from "../utils/cli";
import { updateApplicationTreesState } from "../utils/data";

export const uninstallApplication = async ({
  applicationData: { folder },
}: Application): Promise<void> => {
  const response = await simpleExec(`rm -rf ./${folder}`);

  if (response === "") {
    window.showInformationMessage(`${folder} has been uninstalled`);
  } else {
    window.showErrorMessage(`${folder} could not been uninstalled`);
  }

  await updateApplicationTreesState();
};
