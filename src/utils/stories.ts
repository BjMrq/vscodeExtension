import { Member } from "clubhouse-lib";
import * as R from "ramda";
import { MembersRepo } from "../types/stories";

export const getTeamMemberInfo = (
  members: MembersRepo,
  memberId: string | number,
  property?: [keyof Member, string]
) => {
  const member = members[String(memberId)];

  return property ? R.path(property, member) : member;
};

export const getName = (
  members: MembersRepo,
  memberId?: string | number | null
) =>
  memberId
    ? (getTeamMemberInfo(members, memberId, ["profile", "name"]) as string)
    : "unknown";
