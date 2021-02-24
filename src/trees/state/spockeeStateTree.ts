import * as vscode from "vscode";
import { noneState } from "../../config/constants";
import { SpockeeStateData } from "../../types/data";
import { SpockeeDockerGroup, StateContainerData } from "../../types/docker";
import { StateContainer } from "./stateContainer";
import { DockerStateGroup } from "./stateDockerGroup";
import { StateEmulator } from "./stateEmulator";

// eslint-disable-next-line import/no-unused-modules
export class SpockeeStateTree
  implements
    vscode.TreeDataProvider<DockerStateGroup | StateContainer | StateEmulator> {
  private spockeeStateDockerGroup: SpockeeDockerGroup;

  private spockeeStateContainers: StateContainerData[];

  private spockeeStateRunningDockerGroup: string;

  private spockeeStateEmulator: string;

  constructor(spockeeStateData: SpockeeStateData) {
    this.spockeeStateRunningDockerGroup = spockeeStateData.runningDockerGroup;
    this.spockeeStateDockerGroup = spockeeStateData.containerGroup;
    this.spockeeStateContainers = spockeeStateData.containersState;
    this.spockeeStateEmulator = spockeeStateData.emulatorType;
  }

  private _onDidChangeTreeData: vscode.EventEmitter<
    DockerStateGroup | StateContainer | StateEmulator | undefined | null | void
  > = new vscode.EventEmitter<
    DockerStateGroup | StateContainer | StateEmulator | undefined | null | void
  >();

  readonly onDidChangeTreeData: vscode.Event<
    DockerStateGroup | StateContainer | StateEmulator | undefined | null | void
    // eslint-disable-next-line no-invalid-this
  > = this._onDidChangeTreeData.event;

  refreshWith(spockeeStateData: SpockeeStateData) {
    this.spockeeStateRunningDockerGroup = spockeeStateData.runningDockerGroup;
    this.spockeeStateDockerGroup = spockeeStateData.containerGroup;
    this.spockeeStateContainers = spockeeStateData.containersState;
    this.spockeeStateEmulator = spockeeStateData.emulatorType;
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: DockerStateGroup | StateContainer): vscode.TreeItem {
    return element;
  }

  getChildren(
    element: DockerStateGroup
  ): Thenable<[StateEmulator, DockerStateGroup] | StateContainer[]> {
    if (element?.children) return Promise.resolve(element.children);

    const shouldShowDockerGroup =
      this.spockeeStateRunningDockerGroup !== noneState &&
      this.spockeeStateDockerGroup &&
      this.spockeeStateContainers.some((container) => container.isRunning);

    return Promise.resolve(
      shouldShowDockerGroup
        ? [
            new StateEmulator(this.spockeeStateEmulator),
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
          ]
        : []
    );
  }
}
