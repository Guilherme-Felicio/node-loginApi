import express from "express";
import { request, response } from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(3000, () => console.log("listen port 3000"));
