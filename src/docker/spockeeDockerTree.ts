// eslint-disable-next-line import/no-unresolved
import * as vscode from "vscode";
import { SpockeeApplicationData } from "../types/data";
import { SpockeeDockerGroup } from "../types/docker";
import { DockerContainer } from "./dockerContainer";
import { DockerGroup } from "./dockerGroup";

export class SpockeeDockerGroupTree
  implements vscode.TreeDataProvider<DockerGroup | DockerContainer> {
  private spockeeDockerGroups: SpockeeDockerGroup[];

  constructor(spockeeApplicationData: SpockeeApplicationData) {
    this.spockeeDockerGroups = spockeeApplicationData.dockerGroups;
  }

  private _onDidChangeTreeData: vscode.EventEmitter<
    DockerGroup | DockerContainer | undefined | null | void
  > = new vscode.EventEmitter<
    DockerGroup | DockerContainer | undefined | null | void
  >();

  readonly onDidChangeTreeData: vscode.Event<
    DockerGroup | DockerContainer | undefined | null | void
    // eslint-disable-next-line no-invalid-this
  > = this._onDidChangeTreeData.event;

  refreshWith(spockeeApplicationData: SpockeeApplicationData) {
    this.spockeeDockerGroups = spockeeApplicationData.dockerGroups;
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: DockerGroup | DockerContainer): vscode.TreeItem {
    return element;
  }

  getChildren(
    element: DockerGroup
  ): Thenable<DockerGroup[] | DockerContainer[]> {
    if (element?.children) return Promise.resolve(element.children);

    const groupAndContainers = this.spockeeDockerGroups.map(
      (dockerGroup) =>
        new DockerGroup(
          dockerGroup,
          dockerGroup.containers.map(
            (container) => new DockerContainer(container)
          ),
          vscode.TreeItemCollapsibleState.Collapsed
        )
    );

    const flattenDockerGroups = groupAndContainers.flat();

    return Promise.resolve(flattenDockerGroups);
  }
}
