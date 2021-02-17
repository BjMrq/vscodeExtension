import { initSpockeeData } from "./config/constants";
import { SpockeeDockerGroupTree } from "./docker/spockeeDockerTree";
import { InstalledApplicationsTree } from "./installedApplication/installedApplicationsTree";
import { SpockeeApplicationsTree } from "./spockeeApplications/spockeeApplicationsTree";

export const dockerGroups = new SpockeeDockerGroupTree(initSpockeeData);

export const installedApplications = new InstalledApplicationsTree(
  initSpockeeData
);

export const spockeeApplications = new SpockeeApplicationsTree(initSpockeeData);
