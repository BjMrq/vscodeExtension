import { TreeItem, ThemeIcon } from "vscode";
import { SpockeeApplication } from "../../types/application";

export class InstalledApplication extends TreeItem {
  iconPath = new ThemeIcon("repo");

  contextValue = "installedApplication";

  constructor(public readonly applicationData: SpockeeApplication) {
    super(applicationData.folder);
    this.tooltip = applicationData.folder;
  }
}
