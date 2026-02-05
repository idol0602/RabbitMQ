import express from "express";
import { connectRabbitMQ } from "./rabbitMQ/index.js";
import { Producer } from "./rabbitMQ/producer.js";

const app = express();
app.use(express.json());

connectRabbitMQ();

app.post("/send-message", async(req, res) => {
    try {
        const {to, subject, text} = req.body;
        await Producer.message(text);
        await Producer.mail(to, subject, text)
        res.status(200).json({message : "Message sent successfully"})
    } catch (error) {
        res.status(500).json({message : "Internal server error"})
    }
})

app.listen(3000, () => {
    console.log("Server started on port 3000");
});