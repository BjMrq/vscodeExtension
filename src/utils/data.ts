// eslint-disable-next-line import/no-unresolved
import * as vscode from "vscode";
import { spawnSync } from "child_process";
import { spockeeRoot } from "../config/constants";
import { SpockeeData } from "../types/data";

export const getSpockeeData = (): SpockeeData =>
  JSON.parse(
    String.fromCharCode(
      ...((spawnSync("spockee", ["code"], {
        shell: true,

        env: { ...process.env, SPOCKEE_ROOT: spockeeRoot },
      }).stdout as unknown) as number[])
    )
  ) as SpockeeData;

export function updateTreesState(
  ...trees: vscode.TreeDataProvider<any>[]
): void {
  const freshData = getSpockeeData();

  trees.forEach(function update(tree) {
    // @ts-expect-error
    tree.refreshWith(freshData);
  });
}
