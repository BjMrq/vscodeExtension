import * as vscode from "vscode";
import { SpockeeDockerGroup } from "../../types/docker";
import { StateContainer } from "./stateContainer";
import { getMediaPath } from "../../utils/getMedia";

export class DockerStateGroup extends vscode.TreeItem {
  iconPath = {
    dark: getMediaPath("light_docker.svg"),

    light: getMediaPath("dark_docker.svg"),
  };

  contextValue = "dockerStateGroup";

  constructor(
    public readonly dockerGroupData: SpockeeDockerGroup,
    public readonly children: StateContainer[],
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(dockerGroupData.name, collapsibleState);
    this.tooltip = dockerGroupData.name;
  }
}
