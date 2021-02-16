/* eslint-disable */
import "dotenv/config";

const {SPOCKEE_ROOT, SPOCKEE_TEST, IS_DEV} = process.env;

export const spockeeRoot: string = IS_DEV ? SPOCKEE_TEST! : SPOCKEE_ROOT!;
export const spockeeState = `${spockeeRoot}/.spockee/state.json` as const