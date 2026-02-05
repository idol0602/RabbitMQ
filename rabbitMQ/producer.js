import { getChannel } from "./index.js";
import { EXCHANGE } from "./exchange.js";

export const Producer = {
    message : async (msg) => { 
        const channel = getChannel();
        await channel.publish(EXCHANGE.message.exchange,EXCHANGE.message.bindingKey,Buffer.from(msg))
    },
    mail : async (to, subject, text) => {
        const channel = getChannel();
        await channel.publish(EXCHANGE.mail.exchange,EXCHANGE.mail.bindingKey,Buffer.from(JSON.stringify({to, subject, text})))
    }
}