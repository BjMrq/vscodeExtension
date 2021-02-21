import { Application } from "../trees/spockeeApplications/applicationElement";
import { updateApplicationTreesState } from "../utils/data";
import { createTask } from "../utils/task";

export const installApplication = async ({
  applicationData: { folder },
}: Application): Promise<void> => {
  await createTask(
    `${folder} installing`,
    `spockee git install ${folder}`,
    true
  );

  await updateApplicationTreesState();
};

export const cleanMergedBranches = async (): Promise<void> => {
  await createTask("Pulling latest changes", "spockee git clean", true);
};

export const pullLatest = async (): Promise<void> => {
  await createTask("Pulling latest changes", "spockee git pull", true);
};
