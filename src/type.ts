export type C<P = {}> = (props: P) => string;

export interface ReactElementObject {
  type: Function | string;
  props?: {
    children?: ReactElementObject | ReactElementObject[];
    [key: string]: any;
  };
}

export type JSXObject =
  | string
  | string[]
  | number
  | ReactElementObject
  | ReactElementObject[]
  | boolean;

export type SelfSwitchName = "A" | "B" | "C" | "D";

// export type Operator = "==" | ">=" | "<=" | ">" | "<" | "!=";

export type CreaseOperator = "+" | "-";

export interface VariableId {
  variableId: number;
}
export interface SwitchId {
  switchId: number;
}
export interface FromTo {
  from: number;
  to: number;
}
export type Selector = VariableId | SwitchId | FromTo;
