/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/no-unresolved
import * as vscode from "vscode";
import { InstalledApplication } from "../installedApplication/installedApplicationElement";
import { SpockeeData } from "../types/data";

export class SpockeeCLITree implements vscode.TreeDataProvider<any> {
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

  getTreeItem(element: any): vscode.TreeItem {
    return element;
  }

  getChildren(): Thenable<any[]> {
    return Promise.resolve([]);
  }
}
