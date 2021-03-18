import amqplib, { Connection, Channel } from "amqplib";

export class RabbitMqConsumer {

    private connectionUrl: string;
    private queueName: string;

    private connection!: Connection;
    private channel!: Channel;

    constructor(connectionUrl: string, queueName: string) {
        this.connectionUrl = connectionUrl;
        this.queueName = queueName;
    }

    assignConsumeOnMessage(callback: (data: any) => any) {
        this.channel.consume(this.queueName, callback, { noAck: true });
    }

    async init(): Promise<boolean> {
        try {
            this.connection = await amqplib.connect(this.connectionUrl);
            this.channel = await this.connection.createChannel();
            await this.channel.assertQueue(this.queueName, { durable: true });

            return true;
        }
        catch(err) {
            return false;
        }
    }
}