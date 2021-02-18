/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/no-unresolved
import * as vscode from "vscode";
import { CliCommand } from "../types/command";
import { SpockeeApplicationData } from "../types/data";
import { Command } from "./Command";

export class SpockeeCLITree implements vscode.TreeDataProvider<Command> {
  private cliCommands: CliCommand[];

  constructor(spockeeApplicationData: SpockeeApplicationData) {
    this.cliCommands = spockeeApplicationData.cliCommands;
  }

  private _onDidChangeTreeData: vscode.EventEmitter<
    Command | undefined | null | void
  > = new vscode.EventEmitter<Command | undefined | null | void>();

  readonly onDidChangeTreeData: vscode.Event<
    Command | undefined | null | void
    // eslint-disable-next-line no-invalid-this
  > = this._onDidChangeTreeData.event;

  refreshWith(spockeeApplicationData: SpockeeApplicationData) {
    this.cliCommands = spockeeApplicationData.cliCommands;
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: Command): vscode.TreeItem {
    return element;
  }

  getChildren(): Thenable<any[]> {
    return Promise.resolve(
      this.cliCommands.map((application) => new Command(application))
    );
  }
}
