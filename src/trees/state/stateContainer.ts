import * as vscode from "vscode";
import { StateContainerData } from "../../types/docker";
import { getMediaPath } from "../../utils/getMedia";

export class StateContainer extends vscode.TreeItem {
  iconPath = getMediaPath(
    this.stateContainerData.isRunning
      ? "green_container.svg"
      : "red_container.svg"
  );

  command = {
    title: "Attach logs",
    command: "dockerStateContainer.attachLogs",
    arguments: [this],
  };

  contextValue = "dockerStateContainer";

  constructor(public readonly stateContainerData: StateContainerData) {
    super(stateContainerData.containerName);
    this.tooltip = `${stateContainerData.containerName}-${
      stateContainerData.isRunning ? "running" : "stopped"
    }`;
  }
}
