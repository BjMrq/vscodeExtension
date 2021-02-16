// eslint-disable-next-line import/no-unresolved
import * as vscode from "vscode";
import * as path from "path";

export class DockerContainer extends vscode.TreeItem {
  iconPath = {
    dark: path.join(
      __filename,
      "..",
      "..",
      "..",
      "media",
      "light_container.svg"
    ),

    light: path.join(
      __filename,
      "..",
      "..",
      "..",
      "media",
      "dark_container.svg"
    ),
  };

  contextValue = "dockerContainer";

  constructor(public readonly containerName: string) {
    super(containerName);
    this.tooltip = containerName;
  }
}
