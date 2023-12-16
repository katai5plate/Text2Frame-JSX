import { C, ReactElementObject } from "../type";
import { argId, join, tag } from "../validate";

export const Check: C<{
  condition: string;
  then: ReactElementObject;
  otherwise?: ReactElementObject;
}> = ({ condition, then, otherwise }) =>
  join("\n", [
    tag("If", ["Script", condition]),
    then,
    ...(otherwise ? [tag("Else"), otherwise] : []),
    "<End>",
  ]);

export const Loop: C<{ children: ReactElementObject }> = ({ children }) =>
  join("\n", [tag("Loop"), children, tag("RepeatAbove")]);
export const LoopBreak: C = () => tag("BreakLoop");
export const BreakLoop = LoopBreak;

export const ExitEventProcessing: C = () => tag("ExitEventProcessing");

export const CommonEvent: C<{ id: number }> = ({ id }) =>
  tag("CommonEvent", [argId(id)]);

export const Label: C<{ name: string }> = ({ name }) => tag("Label", [name]);
export const Goto: C<{ name: string }> = ({ name }) =>
  tag("JumpToLabel", [name]);
export const JumpToLabel = Goto;

export const Comment: C<{ children: string | string[] }> = ({ children }) =>
  tag("Comment", undefined, children);
