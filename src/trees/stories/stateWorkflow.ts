import { TreeItem, TreeItemCollapsibleState } from "vscode";
import { WorkflowStateWithStories } from "../../types/stories";
import { DevelopmentStory } from "./developmentStory";

export class StateWorkflow extends TreeItem {
  contextValue = "spockeeWorkflow";

  constructor(
    public readonly workflowData: WorkflowStateWithStories,
    public readonly children: DevelopmentStory[],
    public readonly collapsibleState: TreeItemCollapsibleState
  ) {
    super(`${workflowData.name} (${workflowData.storiesNumber || 0})`);
    this.tooltip = `${workflowData.name} (${workflowData.storiesNumber || 0})`;
    this.description = String(workflowData.description);
  }
}
