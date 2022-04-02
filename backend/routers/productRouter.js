import express from "express";
import { data } from "../data.js";

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  res.send(data.products);
});

productRouter.get("/slug/:slug", async (req, res) => {
  const product = data.products.find((x) => x.slug === req.params.slug);
  res.send(product);
});

productRouter.get("/:id", async (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  res.send(product);
});

export default productRouter;
