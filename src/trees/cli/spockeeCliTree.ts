import * as vscode from "vscode";
import { Commands } from "../../types/command";
import { SpockeeApplicationData } from "../../types/data";
import { Argument } from "./Arguments";
import { Command } from "./Command";

export class SpockeeCLITree implements vscode.TreeDataProvider<Command> {
  private cliCommands: Commands;

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

  getChildren(element: Command): Thenable<any[]> {
    if (element?.children) return Promise.resolve(element.children);

    return Promise.resolve(
      Object.values(this.cliCommands)
        .filter((command) => command.code)
        .filter((command) => command.name !== "start")
        .map(
          (command) =>
            new Command(
              command,
              Object.values(command.arguments)
                .filter((argument) => argument.code)
                .map(
                  (argument) =>
                    new Argument({
                      commandName: command.name,
                      ...argument,
                    })
                ),
              vscode.TreeItemCollapsibleState.Collapsed
            )
        )
        .filter((command) => command.children.length !== 0)
    );
  }
}
