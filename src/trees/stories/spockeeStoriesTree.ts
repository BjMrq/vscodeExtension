import * as vscode from "vscode";
import { SpockeeStoriesData } from "../../types/data";
import { MembersRepo, WorkflowStateWithStories } from "../../types/stories";
import { DevelopmentStory } from "./developmentStory";
import { StateWorkflow } from "./stateWorkflow";

export class SpockeeStoriesTree
  implements vscode.TreeDataProvider<StateWorkflow | DevelopmentStory> {
  workflowStates: WorkflowStateWithStories[];

  private teamMembers: MembersRepo;

  constructor(spockeeStoriesData: SpockeeStoriesData) {
    this.workflowStates = spockeeStoriesData.workflowsWithStories;
    this.teamMembers = spockeeStoriesData.hashTeamMembers;
  }

  private _onDidChangeTreeData: vscode.EventEmitter<
    StateWorkflow | DevelopmentStory | undefined | null | void
  > = new vscode.EventEmitter<
    StateWorkflow | DevelopmentStory | undefined | null | void
  >();

  readonly onDidChangeTreeData: vscode.Event<
    StateWorkflow | DevelopmentStory | undefined | null | void
  > = this._onDidChangeTreeData.event;

  refreshWith(spockeeStoriesData: SpockeeStoriesData) {
    this.workflowStates = spockeeStoriesData.workflowsWithStories;
    this.teamMembers = spockeeStoriesData.hashTeamMembers;
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: StateWorkflow | DevelopmentStory): vscode.TreeItem {
    return element;
  }

  // element: StateWorkflow
  getChildren(
    element: StateWorkflow
  ): Thenable<StateWorkflow[] | DevelopmentStory[]> {
    if (element?.children) return Promise.resolve(element.children);

    const workflowsToDisplay =
      this.workflowStates.length === 0
        ? []
        : this.workflowStates
            .filter((stateWorkflow) => stateWorkflow.storiesNumber !== 0)
            .map(
              (stateWorkflow) =>
                new StateWorkflow(
                  stateWorkflow,
                  [
                    stateWorkflow.stories?.currentSprintStories?.map(
                      (story) =>
                        new DevelopmentStory(
                          story,
                          "current-sprint",
                          stateWorkflow.name,
                          this.teamMembers
                        )
                    ),
                    stateWorkflow.stories?.otherSprintsStories?.map(
                      (story) =>
                        new DevelopmentStory(
                          story,
                          "other-sprint",
                          stateWorkflow.name,
                          this.teamMembers
                        )
                    ),
                  ].flat(),
                  vscode.TreeItemCollapsibleState.Collapsed
                )
            );

    return Promise.resolve(workflowsToDisplay);
  }
}
