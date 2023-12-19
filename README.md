# Text2Frame-JSX

[Text2Frame-MV](https://github.com/yktsr/Text2Frame-MV) を JSX で書く試み

## 使い方

```
npm i react react-dom yktsr/Text2Frame-MV#117-forlib katai5plate/Text2Frame-JSX
npm i -D @babel/core @babel/node @babel/preset-env @babel/preset-react
```

### .babelrc

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

### example.jsx

```jsx
import React from "react";
import { parse, events } from "Text2Frame-JSX";
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
```

### 実行

```
npx babel-node example.jsx
```
