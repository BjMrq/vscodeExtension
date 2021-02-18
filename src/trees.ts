import { SpockeeCLITree } from "./cli/spockeeCliTree";
import { initSpockeeData, initSpockeeStateData } from "./config/constants";
import { SpockeeDockerGroupTree } from "./docker/spockeeDockerTree";
import { InstalledApplicationsTree } from "./installedApplication/installedApplicationsTree";
import { SpockeeApplicationsTree } from "./spockeeApplications/spockeeApplicationsTree";
import { SpockeeStateTree } from "./state/spockeeStateTree";

export const dataTreeTypes = {
  application: "application",
  state: "state",
};

export const spockeeTrees = {
  cliActions: {
    tree: new SpockeeCLITree(initSpockeeData),
    dataSourceType: dataTreeTypes.application,
  },

  spockeeState: {
    tree: new SpockeeStateTree(initSpockeeStateData),
    dataSourceType: dataTreeTypes.state,
  },

  dockerGroups: {
    tree: new SpockeeDockerGroupTree(initSpockeeData),
    dataSourceType: dataTreeTypes.application,
  },

  installedApplications: {
    tree: new InstalledApplicationsTree(initSpockeeData),
    dataSourceType: dataTreeTypes.application,
  },

  spockeeApplications: {
    tree: new SpockeeApplicationsTree(initSpockeeData),
    dataSourceType: dataTreeTypes.application,
  },
};
