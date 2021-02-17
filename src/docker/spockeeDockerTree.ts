/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/no-unresolved
import * as vscode from "vscode";
import { SpockeeData } from "../types/data";
import { DockerContainer } from "./DockerContainer";
import { DockerGroup } from "./DockerGroup";

export class SpockeeDockerGroupTree
  implements vscode.TreeDataProvider<DockerGroup | DockerContainer> {
  constructor(private spockeeData: SpockeeData) {}

  private _onDidChangeTreeData: vscode.EventEmitter<
    DockerGroup | DockerContainer | undefined | null | void
  > = new vscode.EventEmitter<
    DockerGroup | DockerContainer | undefined | null | void
  >();

  readonly onDidChangeTreeData: vscode.Event<
    DockerGroup | DockerContainer | undefined | null | void
    // eslint-disable-next-line no-invalid-this
  > = this._onDidChangeTreeData.event;

  refreshWith(spockeeData: SpockeeData) {
    this.spockeeData = spockeeData;
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: DockerGroup | DockerContainer): vscode.TreeItem {
    return element;
  }

  getChildren(
    element: DockerGroup | DockerContainer
  ): Thenable<DockerGroup | DockerContainer[]> {
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
