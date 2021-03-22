"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const app = express_1.default();
app.use(express_1.default.json()); //parse json body in requests
app.use(cors_1.default());
app.get("/posts", (req, res) => {
    res.json({ message: "hello", date: "today" });
});
app.post("/posts", (req, res) => {
    const recieveddata = req.body;
    res.json({ message: "Thanks for your response", datarecieved: recieveddata });
});
app.listen(4000, () => {
    console.log("server has started on port 4000");
});
//# sourceMappingURL=server.js.map