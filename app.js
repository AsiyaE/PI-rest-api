import express from "express";

import { addArticle, getArticleById, getArticles} from './database.js';

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
    res.status(201).send(article);
});

app.use((err,req,res,next)=>{
    console.log(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, ()=>{
    console.log('Server is working on port 8080');
});