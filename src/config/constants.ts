/* eslint-disable import/no-unassigned-import */
/* eslint-disable putout/putout */
import "dotenv/config";
import { SpockeeApplication } from "../types/application";
import { CliCommand } from "../types/command";
import { SpockeeApplicationData, SpockeeStateData } from "../types/data";
import { SpockeeDockerGroup, StateContainerData } from "../types/docker";

const { SPOCKEE_ROOT, SPOCKEE_TEST, IS_DEV } = process.env;

export const spockeeRoot: string = IS_DEV ? SPOCKEE_TEST! : SPOCKEE_ROOT!;

export const spockeeEnvironments = {
  ...process.env,
  SPOCKEE_ROOT: spockeeRoot,
};

export const initSpockeeData = {
  applicationList: [] as SpockeeApplication[],
  dockerGroups: [] as SpockeeDockerGroup[],
  cliCommands: {} as Record<CliCommand["name"], CliCommand>,
} as SpockeeApplicationData;

export const initSpockeeStateData = {
  containerGroup: {} as SpockeeDockerGroup,
  runningDockerGroup: "",
  containersState: [] as StateContainerData[],
} as SpockeeStateData;

export const dataType = {
  applications: "applications",
  state: "state",
  version: "version",
} as const;

export const noneState = "none";

export const settingsFilePath = `${spockeeRoot}/.spockee/settings.json` as const;
