import * as vscode from "vscode";
import { noneState } from "../../config/constants";

export class StateEmulator extends vscode.TreeItem {
  iconPath = new vscode.ThemeIcon("device-mobile");

  contextValue = "stateEmulator";

  constructor(public readonly emulatorName: string) {
    super(emulatorName);
    this.tooltip = `${emulatorName}-${
      emulatorName === noneState ? "not-running" : "running"
    }`;
  }
}
