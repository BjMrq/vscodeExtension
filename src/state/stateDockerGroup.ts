// eslint-disable-next-line import/no-unresolved
import * as vscode from "vscode";
import * as path from "path";
import { SpockeeDockerGroup } from "../types/docker";
import { StateContainer } from "./stateContainer";

export class DockerStateGroup extends vscode.TreeItem {
  iconPath = {
    dark: path.join(__filename, "..", "..", "..", "media", "light_docker.svg"),

    light: path.join(__filename, "..", "..", "..", "media", "dark_docker.svg"),
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
