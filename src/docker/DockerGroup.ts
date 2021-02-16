// eslint-disable-next-line import/no-unresolved
import * as vscode from "vscode";
import * as path from "path";
import { SpockeeDockerGroup } from "../types/docker";
import { DockerContainer } from "./DockerContainer";

export class DockerGroup extends vscode.TreeItem {
  iconPath = {
    dark: path.join(__filename, "..", "..", "..", "media", "light_docker.svg"),

    light: path.join(__filename, "..", "..", "..", "media", "dark_docker.svg"),
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
