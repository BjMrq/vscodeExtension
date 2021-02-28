/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable prettier/prettier */
import { DevelopmentStory } from "../trees/stories/developmentStory";
import showdown from "showdown";
import { StoryCM, StoryPR } from "../types/stories";
import { getName  } from "../utils/stories";
import { obSeparator } from "../utils/webview";

const converter = new showdown.Converter();

export const getWebviewContent = (story: DevelopmentStory) => {

  const { storyData, teamMembers } = story;

  // @ts-expect-error
  const pullRequests = storyData.pull_requests as  StoryPR[];
  const hasPullRequests = pullRequests.length !== 0;

  const commentsList = storyData.comments as StoryCM[];
  const hasComments = commentsList.length !== 0;

  const hasTasks = storyData.tasks.length !== 0;

    return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${storyData.name}</title>
  </head>
  <style>
  
  </style>
  <body>
    <h1>${storyData.name}</h1>
    </br>
    <h3>Details:</h3>
    ${converter
      .makeHtml(`**id**: [${storyData.id}](${storyData.app_url}) ${obSeparator} **state**: ${story.state || ""} ${obSeparator} **iteration**: ${story.iteration} ${obSeparator} **estimate**: ${storyData.estimate || "not estimated"} ${obSeparator} **requester**: ${getName(teamMembers, storyData.requested_by_id) || ""} ${obSeparator} **owners**: ${storyData.owner_ids?.map(ownerId => getName(teamMembers, ownerId) || "").join(", ") || ""} ${obSeparator} **du date**: ${storyData.deadline || ""}`)}
    </br>
    <h3>Description:</h3>
    ${converter
      .makeHtml(storyData.description)
      .replace(
        /<img .*?>/gu,
        String(converter
          .makeHtml(`[AN IMAGE IS AVAILABLE](${storyData.app_url})`))
      )}
    </br>
    <h3>Tasks:</h3>
    ${
      hasTasks
        ? 
    `<ul>
      ${storyData.tasks
        .map((task) => `<li>${converter.makeHtml(`${(task.complete ? "[X] - " : "[&nbsp;&nbsp;] - ") + task.description} ${task.owner_ids.length === 0 ? "" : " - "} ${task.owner_ids?.map(taskOwnerId => `*${getName(teamMembers, taskOwnerId)}*` || "").join(", ") || ""}`)}</li>`)
        .join("")}
    </ul>` : ""
    }
    </br>
    <h3>Pull requests:</h3>
    ${
      hasPullRequests
        ? 
    `<ul>
      ${pullRequests
        .map((pullRequest) => `<li>${converter.makeHtml(
          `${pullRequest.merged ? "*merged* - " : "*open* - "}
          [${pullRequest.branch_name}](${pullRequest.url}) 
          ${pullRequest.review_status ? `(${pullRequest.review_status})` : ""}`)}</li>`
        ).join("")
      }
    </ul>` : ""
    }
    </br>
    <h3>Comments:</h3>
    ${
      hasComments
        ? 
    `<ul>
      ${commentsList
        .map((comment) => 
        `<li>${converter.makeHtml(`**${getName(teamMembers, comment.author_id)}**:  ${comment.text} - [open](${comment.app_url})`)}</li>`
        ).join("")
      }
    </ul>` : ""
    }
  </body>
  </html>`;

};

