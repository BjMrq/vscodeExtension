/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/no-unresolved
import * as vscode from "vscode";
import { SpockeeData } from "../types/data";
import { Application } from "./applicationElement";

export class SpockeeApplicationsTree
  implements vscode.TreeDataProvider<Application> {
  constructor(private spockeeData: SpockeeData) {}

  private _onDidChangeTreeData: vscode.EventEmitter<
    Application | undefined | null | void
  > = new vscode.EventEmitter<Application | undefined | null | void>();

  readonly onDidChangeTreeData: vscode.Event<
    Application | undefined | null | void
    // eslint-disable-next-line no-invalid-this
  > = this._onDidChangeTreeData.event;

  refreshWith(spockeeData: SpockeeData) {
    this.spockeeData = spockeeData;
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: Application): vscode.TreeItem {
    return element;
  }

  getChildren(): Thenable<any[]> {
    return Promise.resolve(
      this.spockeeData.applicationList.map(
        (application) => new Application(application)
      )
    );
  }
}
