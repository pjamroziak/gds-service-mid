import fs from "fs";
import { FileWriter } from "../src/file.writer";

const testFilePath: string = process.cwd() + "/test_file.txt";
const expectFileContent: string = "TEST";

test("FileWriter append file", () => {
    const fileWriter: FileWriter = new FileWriter(testFilePath);
    const stream = fileWriter.writeStream();

    stream.on('open', () => {
        fileWriter.appendFile(expectFileContent);

        const fileContent: string = fs.readFileSync(testFilePath, {flag:'r', encoding: "ascii"});
        fs.unlinkSync(testFilePath);
    
        expect(expectFileContent).toEqual(fileContent);
    });
});