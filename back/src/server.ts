console.log("About to start a server...");

import express, { NextFunction, Request, Response } from "express";
import serveIndex from "serve-index";
import cors from "cors";
import { Article } from "./interfaces/article";

const app = express();
const port = 3000;
const wwwDir = "../front/dist/front";

const articles: Article[] = [
  { name: "Tournevis", price: 2.56, qty: 10 },
  { name: "Marteau", price: 5, qty: 56 },
];

const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log("req: ", req.url);
  next();
};

app.use(logMiddleware);

app.use("/api", cors());

app.get("/api/date", (req, res) => {
  res.json({ date: new Date() });
});

app.get("/api/articles", (req, res) => {
  res.json(articles);
});

app.use(express.static(wwwDir));
app.use(serveIndex(wwwDir, { icons: true }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
