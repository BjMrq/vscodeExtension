// eslint-disable-next-line import/no-unresolved
import * as vscode from "vscode";
import * as path from "path";
import { SpockeeApplication } from "../types/application";

export class Application extends vscode.TreeItem {
  iconPath = {
    dark: path.join(__filename, "..", "..", "..", "media", "light_git.svg"),

    light: path.join(__filename, "..", "..", "..", "media", "dark_git.svg"),
  };

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
