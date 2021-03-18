import { RabbitMqConsumer } from "./consumers/rabbitMq.consumer";
import { FileWriter } from "./file.writer";
import * as config from "./config";

const fileWrtiter: FileWriter = new FileWriter(config.PATH_TO_FILE);
const rabbitMqConsumer: RabbitMqConsumer = new RabbitMqConsumer(
    config.RABBIT_MQ_CONNECTION_URL, 
    config.RABBIT_MQ_QUEUE_NAME
);

const fileStream = fileWrtiter.writeStream();

fileStream.on('open', (fd) => {
    console.log("FileWriter is initied");
    rabbitMqConsumer.init().then((isInitited) => {
        if(isInitited){
            console.log("rabbitMq is initied");
            rabbitMqConsumer.assignConsumeOnMessage(
                (data) => fileWrtiter.appendFile(data.content.toString() + "\n")
            );
        }
        else {
            throw new Error("rabbitMq not initied");
        }
    });
});