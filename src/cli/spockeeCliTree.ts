/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/no-unresolved
import * as vscode from "vscode";

export class SpockeeCLITree implements vscode.TreeDataProvider<any> {
  getTreeItem(element: any): vscode.TreeItem {
    return element;
  }

  getChildren(): Thenable<any[]> {
    return Promise.resolve([]);
  }
}
