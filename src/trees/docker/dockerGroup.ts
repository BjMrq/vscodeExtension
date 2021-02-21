import * as vscode from "vscode";
import { SpockeeDockerGroup } from "../../types/docker";
import { DockerContainer } from "./dockerContainer";
import { getMediaPath } from "../../utils/getMedia";

export class DockerGroup extends vscode.TreeItem {
  iconPath = {
    dark: getMediaPath("light_docker.svg"),

    light: getMediaPath("dark_docker.svg"),
  };

  contextValue = "dockerGroup";

  constructor(
    public readonly dockerGroupData: SpockeeDockerGroup,
    public readonly children: DockerContainer[],
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(dockerGroupData.name, collapsibleState);
    this.tooltip = dockerGroupData.name;
  }
}
