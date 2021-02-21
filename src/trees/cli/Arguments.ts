import * as vscode from "vscode";
import { CliArgument } from "../../types/command";

export class Argument extends vscode.TreeItem {
  contextValue = "cliArgument";

  constructor(
    public readonly argumentData: CliArgument & { commandName: string }
  ) {
    super(argumentData.name);
    this.tooltip = argumentData.name;
  }
}
