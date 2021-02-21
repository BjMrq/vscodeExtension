import { dataType } from "../config/constants";
import { SpockeeApplication } from "./application";
import { Commands } from "./command";
import { SpockeeDockerGroup, StateContainerData } from "./docker";

export type SpockeeStateData = {
  containerGroup: SpockeeDockerGroup;
  runningDockerGroup: string;
  containersState: StateContainerData[];
};

export type SpockeeApplicationData = {
  applicationList: SpockeeApplication[];
  dockerGroups: SpockeeDockerGroup[];
  cliCommands: Commands;
};

export type SpockeeVersionData = {
  cliVersion: {
    currentVersion: string;
    availableVersion: string;
    changelog: string;
    needUpdate: boolean;
  };
};

export type DataTypes = typeof dataType;
export type PossibleDataType = keyof DataTypes;
