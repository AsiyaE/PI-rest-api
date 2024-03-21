import express from "express";

import { addArticle, changeArticle, getArticleById, getArticles} from './database.js';

const app = express();

app.use(express.json());

app.get("/articles", async (req, res)=>{
    const artics = await getArticles();
    res.send(artics);
});

app.get("/articles/:id", async (req, res)=>{
    const id = req.params.id;
    const artic = await getArticleById(id);
    res.send(artic);
});

app.post("/articles", async (req, res)=>{
    const {name, description, category_id} = req.body;
    const article = await addArticle(name, description, category_id);
      
   
    if (article.affectedRows) {
    res.status(201).send(article);
    }

    res.status(400).send("Запись не создана");
});

app.put("/articles", async (req, res)=>{
    const {name, description, category_id} = req.body;
    const article = await changeArticle(name, description, category_id);
      
   
    if (article.affectedRows) {
        res.status(201).send(article);
    }

    res.status(400).send("Совпадений не найдено");
});


app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    console.log(err.stack);
    res.status(statusCode).send('Что-то сломалось!');
});

app.listen(8080, ()=>{
    console.log('Server is working on port 8080');
});