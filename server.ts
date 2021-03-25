import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import {Client} from "pg";

dotenv.config();
const app = express();

app.use(express.json()); //parse json body in requests
app.use(cors());

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect()

app.get("/posts", async(req, res) => {
    const allPosts = await client.query("SELECT * FROM posts ORDER BY id DESC");
    const dataToReturn = allPosts.rows;
    res.json({data: dataToReturn});
});

app.post("/posts", async(req, res) => {
    const {title, content} = req.body;
    const newPost = await client.query("INSERT INTO posts (title, content) VALUES($1, $2) RETURNING *", [title, content]);
    res.json({message:"Thanks for your response", datarecieved: newPost.rows});
});

app.delete("/posts/:id", async(req, res) => {
    const {id} = req.params;
    await client.query("DELETE FROM posts WHERE id = $1", [id]);
    res.json("Post was deleted");
});

app.put("/posts/:id", async(req, res) => {
    const {id} = req.params;
    const {title, content} = req.body;
    await client.query("UPDATE posts SET title = $1, content=$2 WHERE id = $3", [title, content, id]);
    res.json("Post was updated");
});

const portNumber = process.env.PORT;
app.listen(portNumber, () => {
    console.log(`server has started on ${portNumber} port`)
    });