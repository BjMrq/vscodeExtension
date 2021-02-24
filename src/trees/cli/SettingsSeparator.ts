import * as vscode from "vscode";

export class SettingsSeparator extends vscode.TreeItem {
  iconPath = new vscode.ThemeIcon("gear");

  contextValue = "cliSettingsSeparator";

  constructor() {
    super("Settings");
    // eslint-disable-next-line @shopify/prefer-class-properties
    this.tooltip = "Settings";
  }
}
