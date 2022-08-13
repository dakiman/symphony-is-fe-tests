import * as fs from "fs";

export function writeToFile(filePath: string, textLines: Array<string>): void {
    fs.writeFileSync(filePath, textLines.join("\n"));
}