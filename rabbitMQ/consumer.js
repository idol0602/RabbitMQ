import {EXCHANGE} from "./exchange.js";
import {getChannel} from "./index.js";
import { sendMail } from "../mail/mail.js";

export const Consumer = {

    ready : async () => {
        await Consumer.message();
        await Consumer.mail();
    },

    message : async () => {
        const channel = getChannel();
        channel.consume(EXCHANGE.message.queue, (msg) => {
            console.log(msg.content.toString());
            channel.ack(msg);
        })
    },

    mail : async () => {
        const channel = getChannel();
        channel.consume(EXCHANGE.mail.queue, (msg) => {
            const {to, subject, text} = JSON.parse(msg.content.toString());
            sendMail(to, subject, text);
            channel.ack(msg);
        })
    }
}
