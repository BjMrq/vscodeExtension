/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/no-unresolved
import * as vscode from "vscode";
import { SpockeeData } from "../types/data";
import { InstalledApplication } from "./installedApplicationElement";

export class InstalledApplicationsTree
  implements vscode.TreeDataProvider<InstalledApplication> {
  constructor(private spockeeData: SpockeeData) {}

  private _onDidChangeTreeData: vscode.EventEmitter<
    InstalledApplication | undefined | null | void
  > = new vscode.EventEmitter<InstalledApplication | undefined | null | void>();

  readonly onDidChangeTreeData: vscode.Event<
    InstalledApplication | undefined | null | void
    // eslint-disable-next-line no-invalid-this
  > = this._onDidChangeTreeData.event;

  refreshWith(spockeeData: SpockeeData) {
    this.spockeeData = spockeeData;
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: InstalledApplication): vscode.TreeItem {
    return element;
  }

  getChildren(): Thenable<any[]> {
    return Promise.resolve(
      this.spockeeData.applicationList
        .filter((application) => application.isInstalled)
        .map((application) => new InstalledApplication(application))
    );
  }
}
