// eslint-disable-next-line import/no-unresolved
import { TreeItem, ThemeIcon } from "vscode";
import { SpockeeApplication } from "../../types/application";

export class Application extends TreeItem {
  iconPath = new ThemeIcon("package");

  contextValue = "spockeeApplication";

  constructor(public readonly applicationData: SpockeeApplication) {
    super(applicationData.folder);
    this.tooltip = `${applicationData.folder}-${
      applicationData.isInstalled ? "installed" : "not installed"
    }`;
    this.description = `${applicationData.folder}-${
      applicationData.isInstalled ? "installed" : "not installed"
    }`;
  }
}
