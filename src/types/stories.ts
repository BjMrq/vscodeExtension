/* eslint-disable camelcase */
import {
  WorkflowState,
  Story,
  PullRequest,
  Comment,
  Member,
} from "clubhouse-lib";

export type WorkflowStateWithStories = WorkflowState & {
  storiesNumber: number;
  stories: {
    currentSprintStories: Story[];
    otherSprintsStories: Story[];
  };
};

export type StoryPR = PullRequest & {
  merged: boolean;
  review_status: string;
};

export type MembersRepo = Record<string, Member>;

export type StoryCM = Comment & {
  app_url: string;
};

export type StoryIteration = "current-sprint" | "other-sprint";
