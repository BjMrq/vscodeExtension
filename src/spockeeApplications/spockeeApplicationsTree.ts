/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/no-unresolved
import * as vscode from "vscode";
import { SpockeeApplication } from "../types/application";
import { SpockeeApplicationData } from "../types/data";
import { Application } from "./applicationElement";

export class SpockeeApplicationsTree
  implements vscode.TreeDataProvider<Application> {
  private spockeeApplications: SpockeeApplication[];

  constructor(spockeeApplicationData: SpockeeApplicationData) {
    this.spockeeApplications = spockeeApplicationData.applicationList;
  }

  private _onDidChangeTreeData: vscode.EventEmitter<
    Application | undefined | null | void
  > = new vscode.EventEmitter<Application | undefined | null | void>();

  readonly onDidChangeTreeData: vscode.Event<
    Application | undefined | null | void
    // eslint-disable-next-line no-invalid-this
  > = this._onDidChangeTreeData.event;

  refreshWith(spockeeApplicationData: SpockeeApplicationData) {
    this.spockeeApplications = spockeeApplicationData.applicationList;
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: Application): vscode.TreeItem {
    return element;
  }

  getChildren(): Thenable<any[]> {
    return Promise.resolve(
      this.spockeeApplications
        .filter((application) => !application.isInstalled)
        .map((application) => new Application(application))
    );
  }
}
