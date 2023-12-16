import { CHARACTER_ID_WORD } from "./constants";
import {
  FromTo,
  JSXObject,
  ReactElementObject,
  Selector,
  SwitchId,
  VariableId,
} from "./type";

// export const checkInt = (value: number) => {
//   if (value % 1 !== 0) {
//     throw new Error(`値は整数である必要があります。`);
//   }
//   return value;
// };

// export const checkIntOne = (value: number) => {
//   checkInt(value);
//   if (value < 1) {
//     throw new Error(`値は 1 以上である必要があります。`);
//   }
//   return value;
// };

// export const checkIntRange = (value: number, min: number, max: number) => {
//   checkInt(value);
//   if (!(min <= value && value <= max)) {
//     throw new Error(`値は ${min} ～ ${max} の間の値である必要があります。`);
//   }
//   return value;
// };

// export const checkIntRangeWithWord = (
//   value: number | string,
//   min: number,
//   max: number,
//   wordDictionaly: Record<string, string>
// ) => {
//   if (typeof value === "number") {
//     checkIntRange(value, min, max);
//   } else {
//     if (wordDictionaly) {
//       const keys = Object.keys(wordDictionaly);
//       if (!keys.includes(value)) {
//         throw new Error(`対応している文字列ではありません。${keys.join(", ")}`);
//       }
//     }
//   }
//   return value;
// };

// export const checkId = (value: number) => checkIntOne(value);
// export const checkEnemyIndex = (value: number) => checkIntRange(value, 1, 8);

// export const checkIdWithWord = (
//   value: number | string,
//   wordDictionaly: Record<string, string>
// ) => {
//   if (typeof value === "number") {
//     checkId(value);
//   } else {
//     if (wordDictionaly) {
//       const keys = Object.keys(wordDictionaly);
//       if (!keys.includes(value)) {
//         throw new Error(`対応している文字列ではありません。${keys.join(", ")}`);
//       }
//     }
//   }
//   return value;
// };

// export const idRange = (variableId: number | { from: number; to: number }) =>
//   typeof variableId === "number"
//     ? checkId(variableId)
//     : [checkId(variableId.from), checkId(variableId.to)].join("-");

// export const valueOrVariable = (value: number | { variableId: number }) =>
//   typeof value === "number"
//     ? checkInt(value)
//     : `V[${checkId(value.variableId)}]`;

// export const valueOrVariableWithWord = (
//   value: number | { variableId: number } | string,
//   wordDictionaly: Record<string, string>
// ) => {
//   if (typeof value !== "string") {
//     return valueOrVariable(value);
//   }
//   const keys = Object.keys(wordDictionaly);
//   if (!keys.includes(value)) {
//     throw new Error(`対応している文字列ではありません。${keys.join(", ")}`);
//   }
//   return value;
// };

type ArgValue = number | VariableId | SwitchId | FromTo | string | boolean;
export const arg = <V extends ArgValue>(
  value: V,
  converter: (
    value: V,
    tools: {
      markVariableId: (v: VariableId) => string;
      markSwitchId: (v: SwitchId) => string;
      markFromTo: (v: FromTo) => string;
      markPreset: <P extends Record<string, string>>(
        value: keyof P,
        preset: P
      ) => string;
      //
      validInt: (v: number) => number;
      validRange: (v: number, min: number, max: number) => number;
      validOne: (v: number) => number;
      validId: (v: number) => number;
      //
      isVariableId: (v: Selector | number) => v is VariableId;
      isSwitchId: (v: Selector | number) => v is SwitchId;
      isFromTo: (v: Selector | number) => v is FromTo;
    }
  ) => string | number | boolean
): string => {
  const validInt = (v: number) => {
    if (v % 1 !== 0) {
      throw new Error(`値は整数である必要があります。`);
    }
    return v;
  };
  const range = (v: number, min: number, max: number) => {
    if (!(min <= v && v <= max)) {
      throw new Error(`値は ${min} ～ ${max} の間の値である必要があります。`);
    }
    return v;
  };
  const validOne = (v: number) => range(validInt(v), 1, Infinity);
  return `${converter(value, {
    markVariableId: (v) => `V[${v.variableId}]`,
    markSwitchId: (v) => `SW[${v.switchId}]`,
    markFromTo: (v) => `${v.from}-${v.to}`,
    markPreset: (v, p) => p[v],
    //
    validInt,
    validRange: (v, min, max) => range(validInt(v), min, max),
    validOne,
    validId: validOne,
    //
    isVariableId: (v: Selector | number): v is VariableId => {
      if (typeof v === "number") return false;
      return !!(v as Partial<VariableId>)?.variableId;
    },
    isSwitchId: (v: Selector | number): v is SwitchId => {
      if (typeof v === "number") return false;
      return !!(v as Partial<SwitchId>)?.switchId;
    },
    isFromTo: (v: Selector | number): v is FromTo => {
      if (typeof v === "number") return false;
      return !!(v as Partial<FromTo>)?.from;
    },
  })}`;
};

export const join = (delim: string | null, arr: (JSXObject | undefined)[]) =>
  arr.filter((x) => x !== undefined).join(delim ?? ", ");

export const tag = (
  name: string,
  arg?: (JSXObject | undefined)[],
  textChildren?: string | string[]
) => {
  const args = join(null, arg ?? []);
  return join("\n", [
    args !== "" ? `<${name}: ${args}>` : `<${name}>`,
    ...(textChildren
      ? [
          ...(Array.isArray(textChildren) ? textChildren : [textChildren]),
          `</${name}>`,
        ]
      : []),
  ]);
};

export const argInt = (v: number) => arg(v, (v, t) => t.validInt(v));
export const argId = (v: number) => arg(v, (v, t) => t.validOne(v));
export const argEnemyIndex = (v: number) =>
  arg(v, (v, t) => t.validRange(v, 1, 8));

export const argCharacterIdWithPreset = (
  v: keyof typeof CHARACTER_ID_WORD | number
) =>
  arg(v, (v, t) =>
    typeof v === "number" ? t.validId(v) : t.markPreset(v, CHARACTER_ID_WORD)
  );

export const argIntOrVariableId = (v: number | VariableId) =>
  arg(v, (v, t) => (t.isVariableId(v) ? t.markVariableId(v) : v));
