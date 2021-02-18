import { dataType } from "../config/constants";
import { SpockeeApplication } from "./application";
import { CliCommand } from "./command";
import { SpockeeDockerGroup, StateContainerData } from "./docker";

export type SpockeeStateData = {
  containerGroup: SpockeeDockerGroup;
  runningDockerGroup: string;
  containersState: StateContainerData[];
};

export type SpockeeApplicationData = {
  applicationList: SpockeeApplication[];
  dockerGroups: SpockeeDockerGroup[];
  cliCommands: CliCommand[];
};

export type DataTypes = typeof dataType;
export type PossibleDataType = keyof DataTypes;
