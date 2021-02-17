import { SpockeeCLITree } from "./cli/spockeeCliTree";
import { initSpockeeData } from "./config/constants";
import { SpockeeDockerGroupTree } from "./docker/spockeeDockerTree";
import { InstalledApplicationsTree } from "./installedApplication/installedApplicationsTree";
import { SpockeeApplicationsTree } from "./spockeeApplications/spockeeApplicationsTree";

export const spockeeTress = {
  dockerGroups: new SpockeeDockerGroupTree(initSpockeeData),

  installedApplications: new InstalledApplicationsTree(initSpockeeData),

  spockeeApplications: new SpockeeApplicationsTree(initSpockeeData),

  cliActions: new SpockeeCLITree(),
};
