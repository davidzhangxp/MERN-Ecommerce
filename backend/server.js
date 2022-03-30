import express from "express";
import { data } from "./data.js";

const app = express();

app.get("/", (req, res) => {
  res.send("server is ready");
});

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

const port = process.env.PORT || 8800;

app.listen(port, () => {
  console.log("server at http://localhost:8800");
});
