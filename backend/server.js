import express from "express";
import { data } from "./data.js";
import productRouter from "./routers/productRouter.js";

const app = express();

app.get("/", (req, res) => {
  res.send("server is ready");
});
app.use("/api/products", productRouter);

const port = process.env.PORT || 8800;

app.listen(port, () => {
  console.log("server at http://localhost:8800");
});
