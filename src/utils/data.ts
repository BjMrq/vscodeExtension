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

// export const getSpockeeData = async (): Promise<SpockeeData> =>
//   JSON.parse(await cliSendAction("code")) as SpockeeData;

// function updateTreesDataWith(...trees: vscode.TreeDataProvider<any>[]) {
//   // eslint-disable-next-line putout/putout
//   return function (spockeeData: SpockeeData) {
//     trees.forEach(function update(tree) {
//       // @ts-expect-error
//       tree.refreshWith(spockeeData);
//     });
//   };
// }

// export const updateSpockeeTreesWith = updateTreesDataWith(
//   installedApplications,
//   spockeeApplications,
//   dockerGroups
// );

// export const refreshTreesData = async () => {
//   const freshData = await getSpockeeData();

//   updateSpockeeTreesWith(freshData);
// };
