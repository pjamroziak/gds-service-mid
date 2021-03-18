import fs from "fs";

export class FileWriter {

    private path: string;
    private stream!: fs.WriteStream;

    constructor(path: string) {
        this.path = path;
        this.stream = fs.createWriteStream(this.path, { flags: 'a' });
    }

    writeStream(): fs.WriteStream { return this.stream };

    appendFile(data: string) {
        this.stream.write(data);
    }
}