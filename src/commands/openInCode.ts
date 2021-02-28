import { spockeeRoot } from "../config/constants";
import { Application } from "../trees/spockeeApplications/applicationElement";
import { simpleExec } from "../utils/cli";

export const openInCode = async (locationInSpockeeRoot: string) => {
  await simpleExec(`code ${spockeeRoot}/${locationInSpockeeRoot}`);
};

export const openApplicationInCode = ({ applicationData }: Application) => {
  openInCode(applicationData.folder);
};
