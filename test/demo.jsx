import React from "react";
// import { parse, events } from "Text2Frame-JSX";
import { parse, events } from "../dist";
/** @type {import("Text2Frame-MV/Text2Frame.mjs")} */
const { convert } = require("Text2Frame-MV");

const text = parse(
  <>
    <events.message.Window name="アレックス" />
    {"暇だなー"}
    <events.message.Window name="ブライアン" />
    {"そうだな"}
  </>
);

console.log(text);
// <Name: アレックス>
// 暇だなー
// <Name: ブライアン>
// そうだな

const list = convert(text);
console.log(list);
// [
//   { code: 101, indent: 0, parameters: [ '', 0, 0, 2, 'アレックス' ] },
//   { code: 401, indent: 0, parameters: [ '暇だなー' ] },
//   { code: 101, indent: 0, parameters: [ '', 0, 0, 2, 'ブライアン' ] },
//   { code: 401, indent: 0, parameters: [ 'そうだな' ] }
// ]

const simpleParse = (arr) => arr.join("\n");

console.log(
  simpleParse([
    events.message.Window({ name: "アレックス" }),
    "暇だなー",
    events.message.Window({ name: "ブライアン" }),
    "そうだな",
    events.flow.Check({
      condition: "$gameSwitches.value(10)",
      then: simpleParse([
        events.message.Window({ name: "ぬくりあ" }),
        "めでてえｗｗｗｗｗｗｗ",
      ]),
    }),
  ])
);
// <Name: アレックス>
// 暇だなー
// <Name: ブライアン>
// そうだな
// <If: Script, $gameSwitches.value(10)>
// <Name: ぬくりあ>
// めでてえｗｗｗｗｗｗｗ
// <End>
