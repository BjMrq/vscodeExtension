// eslint-disable-next-line import/no-unresolved
import * as vscode from "vscode";
import { SpockeeApplication } from "../../types/application";
import { SpockeeApplicationData } from "../../types/data";
import { InstalledApplication } from "./installedApplicationElement";

export class InstalledApplicationsTree
  implements vscode.TreeDataProvider<InstalledApplication> {
  private spockeeInstalledApplications: SpockeeApplication[];

  constructor(spockeeApplicationData: SpockeeApplicationData) {
    this.spockeeInstalledApplications = spockeeApplicationData.applicationList;
  }

  private _onDidChangeTreeData: vscode.EventEmitter<
    InstalledApplication | undefined | null | void
  > = new vscode.EventEmitter<InstalledApplication | undefined | null | void>();

  readonly onDidChangeTreeData: vscode.Event<
    InstalledApplication | undefined | null | void
    // eslint-disable-next-line no-invalid-this
  > = this._onDidChangeTreeData.event;

  refreshWith(spockeeApplicationData: SpockeeApplicationData) {
    this.spockeeInstalledApplications = spockeeApplicationData.applicationList;
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: InstalledApplication): vscode.TreeItem {
    return element;
  }

  getChildren(): Thenable<any[]> {
    return Promise.resolve(
      this.spockeeInstalledApplications
        .filter((application) => application.isInstalled)
        .map((application) => new InstalledApplication(application))
    );
  }
}
