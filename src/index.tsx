import React from "react";
import { C, ReactElementObject } from "./type";
import { M, ScrollingText, Window } from "./events/message";
import { Variable } from "./events/progress";
import { Comment } from "./events/flow";

const parse = (component: ReactElementObject): ReactElementObject | string => {
  if (typeof component.type === "function") {
    const { children, ...rest } = component.props || {};
    const parsedRest = Object.entries(rest).reduce(
      (a: { [key: string]: any }, [k, v]) => {
        a[k] = v.$$typeof === Symbol.for("react.element") ? parse(v) : v;
        return a;
      },
      {}
    );
    const parsedChildren = children
      ? parse(children as ReactElementObject)
      : "";
    return component.type({ ...parsedRest, children: parsedChildren });
  }
  if (component.props?.children) {
    if (Array.isArray(component.props.children)) {
      return component.props.children.map((child) => parse(child)).join("\n");
    } else {
      return parse(component.props.children);
    }
  }
  return component;
};

const BattleProcessing: C<{
  troopId: number | `V[${number}]` | "Random";
  ifWin?: ReactElementObject;
  ifEscape?: ReactElementObject;
  ifLose?: ReactElementObject;
}> = ({ troopId, ifWin, ifEscape, ifLose }) => {
  const header = `<BattleProcessing: ${troopId}>`;
  if (ifEscape === undefined && ifLose === undefined) {
    if (ifWin === undefined) {
      return header;
    }
    return [header, ifWin].join("\n");
  }
  return [
    `<BattleProcessing: ${troopId}>`,
    ...(ifWin ? ["<IfWin>", ifWin] : []),
    ...(ifEscape ? ["<IfEscape>", ifEscape] : []),
    ...(ifLose ? ["<IfLose>", ifLose] : []),
    "<End>",
  ].join("\n");
};
const GameOver: C = () => "<GameOver>";

const TROOP_SLIME = 1;

const result = parse(
  <>
    <Window name="スライム" />
    <M>勝負だ！</M>
    <BattleProcessing
      troopId={TROOP_SLIME}
      ifWin={
        <>
          <Window name="主人公" />
          <M>ついに勝ったぞ！</M>
        </>
      }
      ifLose={
        <>
          <Window name="主人公" />
          <M>負けてしまったよ</M>
          <Window name="スライム" />
          <M>残念無念また来週！</M>
          <GameOver />
        </>
      }
    />
    <Window name="スライム" />
    <M>ぐぬぬ・・・、強い・・・</M>
  </>
);

console.log(result);

console.log(
  parse(
    <>
      <Variable
        id={10}
        calc={(op, data) => [
          op.set(data.variable(10)),
          op.add(data.game.character.direction("THIS_EVENT")),
        ]}
      />
      {"あいうえお"}
      {"かきくけこ"}
      {"さしすせそ"}
      {"たちつてと"}
      {`あいうえお
        かきくけこ
        さしすせそ
        たちつてと`}
      <M>
        {"あいうえお"}
        {"かきくけこ"}
        {"さしすせそ"}
        {"たちつてと"}
      </M>
      <M>
        {`
        あいうえお
        かきくけこ
        さしすせそ
        たちつてと
        `}
      </M>
      <M>
        {`あいうえお
          かきくけこ
          さしすせそ
          たちつてと`}
      </M>
      <M>{`あいうえお
           かきくけこ
           さしすせそ
           たちつてと`}</M>
      <ScrollingText noSkip>
        {"あいうえお"}
        {"かきくけこ"}
        {"さしすせそ"}
        {"たちつてと"}
      </ScrollingText>
      <Comment>
        {"aaaaa"}
        {"aaaaa"}
      </Comment>
    </>
  )
);
