// eslint-disable-next-line import/no-unresolved
import * as vscode from "vscode";
import * as path from "path";
import { SpockeeApplication } from "../types/application";

export class InstalledApplication extends vscode.TreeItem {
  iconPath = {
    dark: path.join(__filename, "..", "..", "..", "media", "light_folder.svg"),

    light: path.join(__filename, "..", "..", "..", "media", "dark_folder.svg"),
  };

  contextValue = "installedApplication";

  constructor(public readonly applicationData: SpockeeApplication) {
    super(applicationData.folder);
    this.tooltip = applicationData.folder;
  }
}
