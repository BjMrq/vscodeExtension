import { dataType } from "../config/constants";
import { SpockeeApplication, SpockeeSetting } from "./application";
import { Commands } from "./command";
import { SpockeeDockerGroup, StateContainerData } from "./docker";
import { MembersRepo, WorkflowStateWithStories } from "./stories";

export type SpockeeStateData = {
  containerGroup: SpockeeDockerGroup;
  runningDockerGroup: string;
  containersState: StateContainerData[];
  emulatorType: string;
  spockeeSettings: SpockeeSetting;
};

export type SpockeeApplicationData = {
  applicationList: SpockeeApplication[];
  dockerGroups: SpockeeDockerGroup[];
  cliCommands: Commands;
};

export type SpockeeStoriesData = {
  workflowsWithStories: WorkflowStateWithStories[];
  hashTeamMembers: MembersRepo;
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
