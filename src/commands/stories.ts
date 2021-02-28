import { DevelopmentStory } from "../trees/stories/developmentStory";
import { Uri, env, window, ViewColumn, ProgressLocation } from "vscode";
import { getWebviewContent } from "../views/story";
import { SpockeeStoriesData } from "../types/data";
import { dataType } from "../config/constants";
import { cliSendActionAsync } from "../utils/cli";
import { spockeeTrees } from "../trees";
import { openInCode } from "./openInCode";
import { updateStoriesTreesState } from "../utils/data";

export const openStoryInBrowser = ({ storyData }: DevelopmentStory) => {
  env.openExternal(Uri.parse(storyData.app_url));
};

export const changeStoryState = async ({ storyData }: DevelopmentStory) => {
  const StoriesTree = spockeeTrees.stories.tree;

  const stateChoices = StoriesTree.workflowStates;

  const selectedStateName = (await window.showQuickPick(
    stateChoices.map((state) => state.name)
  )) as string;

  const chosenState = stateChoices.find(
    (state) => state.name === selectedStateName
  );

  if (chosenState) {
    window.withProgress(
      {
        title: `Moving story to ${selectedStateName}`,
        location: ProgressLocation.Notification,
      },
      async () => {
        await cliSendActionAsync(
          "stories",
          "state",
          String(storyData.id),
          String(chosenState.id)
        );

        await updateStoriesTreesState();

        return await new Promise<void>((resolve) => {
          resolve();
        });
      }
    );
  }
};

export const startStory = async ({ storyData }: DevelopmentStory) => {
  const installedApplicationTree = spockeeTrees.installedApplications.tree;

  const applicationsChoices = installedApplicationTree.spockeeInstalledApplications.map(
    (application) => application.folder
  );

  const selectedApplication = (await window.showQuickPick(
    applicationsChoices
  )) as string;

  if (selectedApplication) {
    const prepareBranching = await window.withProgress(
      {
        title: "Creating git branch",
        location: ProgressLocation.Notification,
      },
      async () => {
        const formattedTitle = storyData.name
          .replace(/[^\s\w]/giu, "")
          .replace(/ /gu, "-");

        const cliResponse = await cliSendActionAsync(
          "stories",
          "start",
          selectedApplication,
          String(storyData.id),
          formattedTitle
        );

        return await new Promise<string>((resolve) => {
          resolve(cliResponse);
        });
      }
    );

    if (prepareBranching.includes("work in progress")) {
      window.showErrorMessage(
        prepareBranching.split("The following error as occurred:")[1]
      );
    } else {
      openInCode(selectedApplication);
      await updateStoriesTreesState();
    }
  }
};

export const openStoryInCode = (story: DevelopmentStory) => {
  const webPanel = window.createWebviewPanel(
    "story",
    story.storyData.name,
    ViewColumn.Beside,
    {}
  );

  try {
    webPanel.webview.html = getWebviewContent(story)!;
  } catch (error) {
    console.log(error);
  }
};

export const searchStories = async () => {
  const searchInput = await window.showInputBox({
    prompt:
      "Enter a story id, name or a Clubhouse's query https://help.clubhouse.io/hc/en-us/articles/360000046646-Search-Operators",
  });

  void window.withProgress(
    {
      title: "Searching stories",
      location: { viewId: "spockeeStories" },
    },
    async () => {
      const spockeeStoriesData = JSON.parse(
        await cliSendActionAsync(
          "code",
          dataType.stories,
          "--search",
          searchInput || ""
        )
      ) as SpockeeStoriesData;

      await updateStoriesTreesState(spockeeStoriesData);

      return await new Promise<void>((resolve) => {
        resolve();
      });
    }
  );
};
