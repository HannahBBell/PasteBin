import cors from "cors";
import express from "express";

// const express = require("express");
// const cors = require("cors");

const app = express();

app.use(express.json()); //parse json body in requests
app.use(cors());

app.get("/posts", (req, res) => {
    res.json({message: "hello", date: "today"});
})

app.post("/posts", (req, res) => {
    const recieveddata = req.body;
    res.json({message:"Thanks for your response", datarecieved: recieveddata})
})

app.listen(4000, () => {
    console.log("server has started on port 4000")
});