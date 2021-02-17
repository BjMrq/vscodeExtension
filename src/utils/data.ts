// eslint-disable-next-line import/no-unresolved
import * as vscode from "vscode";
import { SpockeeData } from "../types/data";
import { spockeeTrees } from "../trees";
import { cliSendActionSync } from "./cli";

export const getSpockeeData = (): SpockeeData =>
  JSON.parse(cliSendActionSync("code")) as SpockeeData;

function updateTreesState(trees: vscode.TreeDataProvider<any>[]) {
  return (spockeeData: SpockeeData) => {
    trees.forEach(function update(tree) {
      console.log(tree);
      // @ts-expect-error
      tree.refreshWith(spockeeData);
    });
  };
  // const freshData = getSpockeeData();
}

export const updateAllTreesState = (spockeeData?: SpockeeData) =>
  updateTreesState(Object.values(spockeeTrees))(
    spockeeData || getSpockeeData()
  );
