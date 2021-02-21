// eslint-disable-next-line import/no-unresolved
import * as vscode from "vscode";
import { SpockeeStateData } from "../../types/data";
import { SpockeeDockerGroup, StateContainerData } from "../../types/docker";
import { StateContainer } from "./stateContainer";
import { DockerStateGroup } from "./stateDockerGroup";

export class SpockeeStateTree
  implements vscode.TreeDataProvider<DockerStateGroup | StateContainer> {
  private spockeeStateDockerGroup: SpockeeDockerGroup;

  private spockeeStateContainers: StateContainerData[];

  constructor(spockeeStateData: SpockeeStateData) {
    this.spockeeStateDockerGroup = spockeeStateData.containerGroup;
    this.spockeeStateContainers = spockeeStateData.containersState;
  }

  private _onDidChangeTreeData: vscode.EventEmitter<
    DockerStateGroup | StateContainer | undefined | null | void
  > = new vscode.EventEmitter<
    DockerStateGroup | StateContainer | undefined | null | void
  >();

  readonly onDidChangeTreeData: vscode.Event<
    DockerStateGroup | StateContainer | undefined | null | void
    // eslint-disable-next-line no-invalid-this
  > = this._onDidChangeTreeData.event;

  refreshWith(spockeeStateData: SpockeeStateData) {
    this.spockeeStateDockerGroup = spockeeStateData.containerGroup;
    this.spockeeStateContainers = spockeeStateData.containersState;
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: DockerStateGroup | StateContainer): vscode.TreeItem {
    return element;
  }

  getChildren(
    element: DockerStateGroup
  ): Thenable<DockerStateGroup[] | StateContainer[]> {
    if (element?.children) return Promise.resolve(element.children);

    return Promise.resolve([
      new DockerStateGroup(
        this.spockeeStateDockerGroup,
        this.spockeeStateContainers.map(
          (container) =>
            new StateContainer({
              ...container,
              dockerGroup: this.spockeeStateDockerGroup,
            })
        ),
        vscode.TreeItemCollapsibleState.Expanded
      ),
    ]);
  }
}
