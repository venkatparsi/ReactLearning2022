import * as fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import ts from "typescript";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let sourceCode = fs.readFileSync(__filename, "utf8");
let tsSourceFile = ts.createSourceFile(__filename, sourceCode, ts.ScriptTarget.Latest);
for (let statement of tsSourceFile.statements)
    console.log("STATEMENT==>", statement, "<==STATEMENT");
fs.writeFileSync(__filename, ts.createPrinter().printFile(tsSourceFile), "utf8");
