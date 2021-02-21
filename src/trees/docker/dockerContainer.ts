// eslint-disable-next-line import/no-unresolved
import * as vscode from "vscode";
import { getMediaPath } from "../../utils/getMedia";

export class DockerContainer extends vscode.TreeItem {
  iconPath = {
    dark: getMediaPath("light_container.svg"),

    light: getMediaPath("dark_container.svg"),
  };

  contextValue = "dockerContainer";

  constructor(public readonly containerName: string) {
    super(containerName);
    this.tooltip = containerName;
  }
}
