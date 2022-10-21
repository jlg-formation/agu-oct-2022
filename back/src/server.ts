console.log("About to start a server...");

import express, { NextFunction, Request, Response } from "express";
import serveIndex from "serve-index";
import cors from "cors";
import { Article } from "./interfaces/article";

const app = express();
const port = 3000;
const wwwDir = "../front/dist/front";

const generateId = () => {
  return Date.now() + "";
};

let articles: Article[] = [
  { id: "a1", name: "Tournevis", price: 2.56, qty: 10 },
  { id: "a2", name: "Marteau", price: 5, qty: 56 },
];

const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log("req: ", req.url);
  next();
};

app.use(logMiddleware);

app.use("/api", cors());
app.use("/api", (req, res, next) => {
  setTimeout(next, 10);
});

app.get("/api/date", (req, res) => {
  res.json({ date: new Date() });
});

app.get("/api/articles", (req, res) => {
  res.json(articles);
});

app.use("/api", express.json());

app.post("/api/articles", (req, res) => {
  const article: Article = req.body;
  article.id = generateId();
  articles.push(article);
  res.status(204).end();
});

app.delete("/api/articles", (req, res) => {
  const ids: string[] = req.body;
  articles = articles.filter((a) => !ids.includes(a.id));
  res.status(204).end();
});

app.use(express.static(wwwDir));
app.use(serveIndex(wwwDir, { icons: true }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
