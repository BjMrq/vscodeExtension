type CliFlag = {
  name: string;
  flagName: string;
  alias: string;
  type: String;
  multiple: boolean;
  options: Record<string, string>;
};

export type CliArgument = {
  name: string;
  value: string;
  prompted: boolean;
  code: boolean;
};

export type CliCommand = {
  name: string;
  arguments: Record<CliArgument["name"], CliArgument>;
  argumentRequired: boolean;
  allowMultipleArguments: boolean;
  flags: Record<CliFlag["name"], CliFlag>;
  code: boolean;
};

export type Commands = Record<CliCommand["name"], CliCommand>;
