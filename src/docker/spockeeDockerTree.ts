/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/no-unresolved
import * as vscode from "vscode";
import { SpockeeData } from "../types/data";
import { DockerContainer } from "./DockerContainer";
import { DockerGroup } from "./DockerGroup";

export class SpockeeDockerGroupTree
  implements vscode.TreeDataProvider<DockerGroup> {
  constructor(private spockeeData: SpockeeData) {}

  getTreeItem(element: DockerGroup): vscode.TreeItem {
    return element;
  }

  getChildren(element: DockerGroup): Thenable<any[]> {
    if (element?.children) return Promise.resolve(element.children);

    const groupAndContainers = this.spockeeData.dockerGroups.map(
      (dockerGroup) =>
        new DockerGroup(
          dockerGroup,
          dockerGroup.containers.map(
            (container) => new DockerContainer(container)
          ),
          vscode.TreeItemCollapsibleState.Collapsed
        )
    );

    // @ts-expect-error
    const flattenDockerGroups = groupAndContainers.flat();

    return Promise.resolve(flattenDockerGroups);
  }
}
