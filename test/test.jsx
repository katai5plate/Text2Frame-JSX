import React from "react";
import { parse } from "../src";
import { ScrollingText, Window } from "../src/events/message";
import { BattleProcessing, GameOver } from "../src/events/scene";
import { Variable } from "../src/events/progress";
import { Comment } from "../src/events/flow";

const TROOP_SLIME = 1;

console.log(
  parse(
    <>
      <Window name="スライム" />
      {"勝負だ！"}
      <BattleProcessing
        id={TROOP_SLIME}
        ifWin={
          <>
            <Window name="主人公" />
            {"ついに勝ったぞ！"}
          </>
        }
        ifLose={
          <>
            <Window name="主人公" />
            {"負けてしまったよ"}
            <Window name="スライム" />
            {"残念無念また来週！"}
            <GameOver />
          </>
        }
      />
      <Window name="スライム" />
      {"ぐぬぬ・・・、強い・・・"}
    </>
  )
);

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
      <ScrollingText
        noSkip
        text={[
          //
          "あいうえお",
          "かきくけこ",
          "さしすせそ",
          "たちつてと",
        ]}
      />
      <Comment
        text={[
          //
          "あいうえお",
          "かきくけこ",
          "さしすせそ",
          "たちつてと",
        ]}
      />
    </>
  )
);
