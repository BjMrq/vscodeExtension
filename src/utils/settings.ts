import { settingsFilePath } from "../config/constants";
import { SpockeeSettingsOptions } from "../types/settings";
import { simpleExec } from "./cli";

/**
 * Get the values written in the setting file in.spockee folder
 * @returns {Promise<SpockeeSettingsOptions>} the setting file content
 */
export const getSpockeeSettings = async <
  M extends keyof SpockeeSettingsOptions | undefined
>(
  settingKey?: M
): Promise<
  | (M extends keyof SpockeeSettingsOptions
      ? SpockeeSettingsOptions[M]
      : SpockeeSettingsOptions)
  | string
> => {
  try {
    const settings = JSON.parse(
      await simpleExec(`cat ${settingsFilePath}`)
    ) as SpockeeSettingsOptions;

    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return settingKey ? settings[settingKey] : settings;
  } catch {
    return "";
  }
};
