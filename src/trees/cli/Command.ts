import * as vscode from "vscode";
import { CliCommand } from "../../types/command";
import { Argument } from "./Arguments";

export class Command extends vscode.TreeItem {
  contextValue = "cliCommand";

  constructor(
    public readonly cliCommand: CliCommand,
    public readonly children: Argument[],
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(cliCommand.name);
    this.tooltip = cliCommand.name;
  }
}
