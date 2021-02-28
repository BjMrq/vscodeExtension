import { TreeItem, ThemeIcon } from "vscode";
import { SpockeeApplication } from "../../types/application";

export class InstalledApplication extends TreeItem {
  iconPath = new ThemeIcon("repo");

  command = {
    title: "Open in code",
    command: "spockeeApp.openInCode",
    arguments: [this],
  };

  contextValue = "installedApplication";

  constructor(public readonly applicationData: SpockeeApplication) {
    super(applicationData.folder);
    this.tooltip = applicationData.folder;
  }
}
