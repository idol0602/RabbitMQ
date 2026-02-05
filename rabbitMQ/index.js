import amqp from "amqplib";
import { EXCHANGE } from "./exchange.js";
import { Consumer } from "./consumer.js";
import dotenv from "dotenv";
dotenv.config();

const URL = process.env.RABBITMQ_URL;
let channel =  null;

export const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(URL);
        channel = await connection.createChannel();
        setup();
        Consumer.ready();
        console.log("Connected to RabbitMQ");
        
    } catch (error) {
        console.log(error)
    }
}

const setup = async () => {
    for(let [_,value] of Object.entries(EXCHANGE)) {
        await channel.assertExchange(value.exchange,value.type,{durable:true});
        await channel.assertQueue(value.queue, {durable: true})
        await channel.bindQueue(value.queue,value.exchange,value.bindingKey)
    }
}

export const getChannel = () => {
    return channel;
}