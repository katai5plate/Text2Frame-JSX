export type C<P = {}> = (props: P) => string;
export interface ReactElementObject {
    type: Function | string;
    props?: {
        children?: ReactElementObject | ReactElementObject[];
        [key: string]: any;
    };
}
export type JSXObject = string | string[] | number | ReactElementObject | ReactElementObject[] | boolean;
export type SelfSwitchName = "A" | "B" | "C" | "D";
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
export interface MapPosition {
    id: number;
    x: number;
    y: number;
}
export interface Sound {
    name?: string;
    volume: number;
    pitch: number;
    pan: number;
}
export interface Color3 {
    r: number;
    g: number;
    b: number;
}
export type Color4 = Color3 & {
    x: number;
};
export type Selector = VariableId | SwitchId | FromTo | MapPosition | Sound | Color3 | Color4;
export type ArgValue = number | Selector | string | boolean | object;
export type DirectOrVariables = "DIRECT" | "VARIABLES";
//# sourceMappingURL=type.d.ts.map