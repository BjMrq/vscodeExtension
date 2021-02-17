/* eslint-disable */
import "dotenv/config";
import { SpockeeApplication } from "../types/application";
import { SpockeeData } from "../types/data";
import { SpockeeDockerGroup } from "../types/docker";
import { SpockeeState } from "../types/state";

const {SPOCKEE_ROOT, SPOCKEE_TEST, IS_DEV} = process.env;

export const spockeeRoot: string = IS_DEV ? SPOCKEE_TEST! : SPOCKEE_ROOT!;
export const spockeeState = `${spockeeRoot}/.spockee/state.json` as const

export const initSpockeeData = {
  applicationList: [] as SpockeeApplication[],
  spockeeState: {} as SpockeeState,
  dockerGroups: [] as SpockeeDockerGroup[]
  } as SpockeeData