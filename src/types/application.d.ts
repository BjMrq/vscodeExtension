type EnvironmentVariable = {
  name: string;
  paramterStorePath: string;
};

type Secrets = {
  file: string;
  secrets: EnvironmentVariable[];
};

export type SpockeeApplication = {
  optional: boolean;
  isInstalled: boolean;
  repo: string;
  folder: string;
  containerName: string;
  dockerComposeGroups: string[];
  envs: Secrets[];
  dependencies: string;
  activeBranch: string;
};

export type SpockeeSetting = {
  startFlags: string;
};
