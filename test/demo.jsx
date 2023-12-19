import React from "react";
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
