import { DiffDOM } from "diff-dom";
import prettier from "prettier";
import { readFileSync, writeFileSync } from "fs";
import { JSDOM } from "jsdom";

const dd = new DiffDOM();

const htmlA = readFileSync("./distIndex.html", "utf8");
const htmlB = readFileSync("./clientSideIndex.html", "utf8");

const diff = dd.diff(htmlA, htmlB);
const diffString = JSON.stringify(diff);
const formattedDiff = prettier.format(diffString, { parser: "json" });

writeFileSync("the_diff.txt", formattedDiff);
console.log(diff);