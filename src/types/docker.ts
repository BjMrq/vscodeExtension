import { SpockeeApplication } from "./application";

export type SpockeeDockerGroup = {
  name: string;
  file: string;
  command: string;
  containers: string[];
  applications: SpockeeApplication[];
};

export type StateContainerData = {
  containerName: string;
  isRunning: boolean;
};
