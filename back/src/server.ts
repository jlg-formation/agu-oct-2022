console.log("About to start a server...");

import express, { NextFunction, Request, Response } from "express";
import serveIndex from "serve-index";

const app = express();
const port = 3000;
const wwwDir = ".";

const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log("req: ", req.url);
  next();
}

app.use(logMiddleware);

app.get("/api/date", (req, res) => {
  res.json({ date: new Date() });
});

app.use(express.static(wwwDir));
app.use(serveIndex(wwwDir, { icons: true }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
