import express from "express";
import next from "next";
import helmet from "helmet";
import apiArticles from "./api/api-articles.js";
import apiArticle from "./api/api-article.js";
import rss from "./rss.js";

const port = Number(process.env.APP_PORT) || 3000;
const dev = process.env.NODE_ENV !== "production";

const nextApp = next({ dev });
const nextRequestHandler = nextApp.getRequestHandler();

async function main() {
  await nextApp.prepare();

  const expressServer = express();
  expressServer.use(helmet());

  // API
  expressServer.get("/api/articles", async (req, res) => {
    const articles = await apiArticles();
    res.json(articles);
  });
  expressServer.get("/api/article/:url", async (req, res) => {
    const article = await apiArticle(req.params.url);
    res.json(article);
  });

  // Special
  expressServer.get("/rss", async (req, res) => {
    const articles = await apiArticles();
    const rssString = rss(articles);

    res.set("Content-Type", "application/rss+xml");
    res.send(rssString);
  });

  // Articles
  expressServer.get("/:articleUrl", (req, res) => {
    return nextApp.render(req, res, "/article", {
      articleUrl: req.params.articleUrl
    });
  });

  // Rest
  expressServer.get("*", (req, res) => {
    return nextRequestHandler(req, res);
  });

  // Start the server
  expressServer.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
}

main();
