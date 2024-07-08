export type Option = {
  text: string;
  value: string;
};

export enum SuggestionTypes {
  attribute = "Attribute",
  operator = "Operator",
  value = "Value",
}

export interface QueryProps {
  helperText: SuggestionTypes;
  suggestionOptions: Option[];
  helperTextColor: string;
  enableSuggestions: boolean;
  nextProp?: SuggestionTypes;
}
