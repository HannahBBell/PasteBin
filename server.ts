import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import {Client} from "pg";

dotenv.config();
const app = express();

app.use(express.json()); //parse json body in requests
app.use(cors());

const client = new Client({
    connectionString: process.env.URI,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect()

app.get("/posts", async(req, res) => {
    const allPosts = await client.query("SELECT * FROM posts");
    // res.json(allPosts.rows);
    console.log(allPosts);
    res.json({message: "hello", data: allPosts.rows });
});

app.post("/posts", (req, res) => {
    const recieveddata = req.body;
    res.json({message:"Thanks for your response", datarecieved: recieveddata})
})

const portNumber = process.env.PORT;

app.listen(portNumber, () => {
    console.log(`server has started on ${portNumber} port`)
    });