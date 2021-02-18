// eslint-disable-next-line import/no-unresolved
import * as vscode from "vscode";
import * as path from "path";
import { StateContainerData } from "../types/docker";

export class StateContainer extends vscode.TreeItem {
  iconPath = path.join(
    __filename,
    "..",
    "..",
    "..",
    "media",
    this.stateContainerData.isRunning
      ? "green_container.svg"
      : "red_container.svg"
  );

  contextValue = "dockerContainer";

  constructor(public readonly stateContainerData: StateContainerData) {
    super(stateContainerData.containerName);
    this.tooltip = `${stateContainerData.containerName}-${
      stateContainerData.isRunning ? "running" : "stopped"
    }`;
  }
}
