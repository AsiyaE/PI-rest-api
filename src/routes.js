import { changeArticleHandler, createArticleHandler, getArticleByIdHandler, getArticlesHandler } from "./controllers/articleController.js";


function routes(app){
    app.get("/articles", getArticlesHandler);
    app.get("/articles/:id", getArticleByIdHandler);
    app.post("/articles", createArticleHandler);
    app.put("/articles/:id", changeArticleHandler);
    app.delete("/articles/:id")
}

export default routes;
