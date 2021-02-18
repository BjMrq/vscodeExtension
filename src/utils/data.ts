/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line import/no-unresolved
import * as vscode from "vscode";
import { dataTreeTypes, spockeeTrees } from "../trees";
import {
  DataTypes,
  PossibleDataType,
  SpockeeApplicationData,
  SpockeeStateData,
} from "../types/data";
import { cliSendActionSync } from "./cli";

const getSpockeeData = <M extends PossibleDataType>(
  dataType: M
) => (): M extends DataTypes["applications"]
  ? SpockeeApplicationData
  : M extends DataTypes["state"]
  ? SpockeeStateData
  : never => {
  const cliResponse = cliSendActionSync("code", "--data", dataType);

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(cliResponse);
  } catch {
    throw new Error(
      `Cli data could not been parsed, was expecting JSON instead received: ${cliResponse}`
    );
  }
};

export const getSpockeeApplicationData = getSpockeeData("applications");

export const getSpockeeStateData = getSpockeeData("state");

function updateTreesState(trees: vscode.TreeDataProvider<any>[]) {
  return (spockeeData: SpockeeApplicationData | SpockeeStateData) => {
    trees.forEach(function update(tree) {
      console.log(tree);
      // @ts-expect-error
      tree.refreshWith(spockeeData);
    });
  };
  // const freshData = getSpockeeApplicationData();
}

export const updateApplicationTreesState = (
  spockeeData?: SpockeeApplicationData
) =>
  updateTreesState(
    Object.values(spockeeTrees)
      .filter(
        (treeInfo) => treeInfo.dataSourceType === dataTreeTypes.application
      )
      .map((treeInfo) => treeInfo.tree)
  )(spockeeData || getSpockeeApplicationData());

export const updateStateTreesState = (spockeeData?: SpockeeStateData) =>
  updateTreesState(
    Object.values(spockeeTrees)
      .filter((treeInfo) => treeInfo.dataSourceType === dataTreeTypes.state)
      .map((treeInfo) => treeInfo.tree)
  )(spockeeData || getSpockeeStateData());
