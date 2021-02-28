import { window } from "vscode";
import { SpockeeCLITree } from "./trees/cli/spockeeCliTree";
import {
  initSpockeeData,
  initSpockeeStateData,
  initSpockeeStoriesData,
} from "./config/constants";
import { SpockeeDockerGroupTree } from "./trees/docker/spockeeDockerTree";
import { InstalledApplicationsTree } from "./trees/installedApplication/installedApplicationsTree";
import { SpockeeApplicationsTree } from "./trees/spockeeApplications/spockeeApplicationsTree";
import { SpockeeStateTree } from "./trees/state/spockeeStateTree";
import { SpockeeStoriesTree } from "./trees/stories/spockeeStoriesTree";

export const dataTreeTypes = {
  application: "application",
  state: "state",
  stories: "stories",
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

  stories: {
    tree: new SpockeeStoriesTree(initSpockeeStoriesData),
    dataSourceType: dataTreeTypes.stories,
  },
};

export const registerTrees = () => {
  // Stories
  window.createTreeView("spockeeStories", {
    treeDataProvider: spockeeTrees.stories.tree,
  });

  // CLI
  window.createTreeView("spockeeCli", {
    treeDataProvider: spockeeTrees.cliActions.tree,
  });

  // State
  window.createTreeView("spockeeDockerState", {
    treeDataProvider: spockeeTrees.spockeeState.tree,
  });

  // Docker
  window.createTreeView("spockeeDockerGroup", {
    treeDataProvider: spockeeTrees.dockerGroups.tree,
  });

  // Installed applications
  window.createTreeView("installedApplications", {
    treeDataProvider: spockeeTrees.installedApplications.tree,
  });

  // All spockee applications
  window.createTreeView("spockeeApplications", {
    treeDataProvider: spockeeTrees.spockeeApplications.tree,
  });
};
