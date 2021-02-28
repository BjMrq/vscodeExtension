import { Story } from "clubhouse-lib";
import { TreeItem } from "vscode";
import { MembersRepo, StoryIteration } from "../../types/stories";

export class DevelopmentStory extends TreeItem {
  contextValue = "spockeeStory";

  // eslint-disable-next-line max-params
  constructor(
    public readonly storyData: Story,
    public readonly iteration: StoryIteration,
    public readonly state: string,
    public readonly teamMembers: MembersRepo
  ) {
    super(`${storyData.name} (${iteration})`);
    this.tooltip = `${storyData.name} (${iteration})`;
    this.description = storyData.description;
  }

  command = {
    title: "Open",
    command: "spockeeStoriesData.openCode",
    arguments: [this],
  };
}
