// eslint-disable-next-line import/no-unresolved
import * as vscode from "vscode";
import { CliCommand } from "../types/command";

export class Command extends vscode.TreeItem {
  // iconPath = {
  //   dark: path.join(__filename, "..", "..", "..", "media", "light_cli.svg"),

  //   light: path.join(__filename, "..", "..", "..", "media", "dark_cli.svg"),
  // };

  contextValue = "cliCommand";

  constructor(public readonly cliCommand: CliCommand) {
    super(cliCommand.name);
    this.tooltip = cliCommand.name;
  }
}
