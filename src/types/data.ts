import { SpockeeApplication } from "./application";
import { SpockeeDockerGroup } from "./docker";
import { SpockeeState } from "./state";

export type SpockeeData = {
  applicationList: SpockeeApplication[];
  spockeeState: SpockeeState;
  dockerGroups: SpockeeDockerGroup[];
};
