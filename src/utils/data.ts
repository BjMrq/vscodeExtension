/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as vscode from "vscode";
import { dataTreeTypes, spockeeTrees } from "../trees";
import {
  DataTypes,
  PossibleDataType,
  SpockeeApplicationData,
  SpockeeStateData,
  SpockeeStoriesData,
  SpockeeVersionData,
} from "../types/data";
import { cliSendActionAsync } from "./cli";

const getSpockeeAsyncData = <M extends PossibleDataType>(
  dataType: M
) => async (): Promise<
  M extends DataTypes["applications"]
    ? SpockeeApplicationData
    : M extends DataTypes["state"]
    ? SpockeeStateData
    : M extends DataTypes["version"]
    ? SpockeeVersionData
    : M extends DataTypes["stories"]
    ? SpockeeStoriesData
    : never
> => {
  const cliResponse = await cliSendActionAsync("code", dataType);

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(cliResponse);
  } catch {
    throw new Error(
      `Cli data could not been parsed, was expecting JSON instead received: ${cliResponse}`
    );
  }
};

export const getSpockeeApplicationData = getSpockeeAsyncData("applications");

export const getSpockeeStateData = getSpockeeAsyncData("state");

export const getSpockeeVersionData = getSpockeeAsyncData("version");

export const getSpockeeStoriesData = getSpockeeAsyncData("stories");

function updateTreesState(trees: vscode.TreeDataProvider<any>[]) {
  return (
    spockeeData: SpockeeApplicationData | SpockeeStateData | SpockeeStoriesData
  ) => {
    trees.forEach(function update(tree) {
      // @ts-expect-error
      tree.refreshWith(spockeeData);
    });
  };
}

export const updateStoriesTreesState = async (
  spockeeData?: SpockeeStoriesData
) => {
  void vscode.window.withProgress(
    {
      title: "Refreshing stories",
      location: { viewId: "spockeeStories" },
    },
    async () => {
      updateTreesState(
        Object.values(spockeeTrees)
          .filter(
            (treeInfo) => treeInfo.dataSourceType === dataTreeTypes.stories
          )
          .map((treeInfo) => treeInfo.tree)
      )(spockeeData || (await getSpockeeStoriesData()));

      return new Promise<void>((resolve) => {
        resolve();
      });
    }
  );
};

export const updateApplicationTreesState = async (
  spockeeData?: SpockeeApplicationData
) =>
  updateTreesState(
    Object.values(spockeeTrees)
      .filter(
        (treeInfo) => treeInfo.dataSourceType === dataTreeTypes.application
      )
      .map((treeInfo) => treeInfo.tree)
  )(spockeeData || (await getSpockeeApplicationData()));

export const updateStateTreesState = async (spockeeData?: SpockeeStateData) => {
  void vscode.window.withProgress(
    {
      title: "Refreshing state",
      location: { viewId: "spockeeDockerState" },
    },
    async () => {
      updateTreesState(
        Object.values(spockeeTrees)
          .filter((treeInfo) => treeInfo.dataSourceType === dataTreeTypes.state)
          .map((treeInfo) => treeInfo.tree)
      )(spockeeData || (await getSpockeeStateData()));

      return new Promise<void>((resolve) => {
        resolve();
      });
    }
  );
};
