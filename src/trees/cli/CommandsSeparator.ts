import * as vscode from "vscode";
import { Command } from "./Command"

export class CommandsSeparator extends vscode.TreeItem {
  iconPath = new vscode.ThemeIcon("console");

  contextValue = "cliCommandsSeparator";

  constructor(public readonly children: Command[], public readonly collapsibleState: vscode.TreeItemCollapsibleState) {
    super("Commands");
    this.tooltip = "Commands";
  }
}
