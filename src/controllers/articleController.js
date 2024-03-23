import { addArticle, changeArticle, getArticleById, getArticleByMatch, getArticles} from '../database.js';


export async function getArticlesHandler(req, res){
    const str = req.query.query;
    console.log(str);
    if (str) {
        const articles = await getArticleByMatch(str);
        res.send(articles);
    }
    else{
        const artics = await getArticles();
        res.send(artics);
    }
}

export async function getArticleByIdHandler(req,res){
    const id = req.params.id;
    const artic = await getArticleById(id);
    res.send(artic);
}

export async function createArticleHandler(req,res){
    const {name, description, category_id} = req.body;
    if ((!Number.isInteger(category_id) && category_id!==null)){
        res.status(400).send("Bad Request");
        return;
    }

    const article = await addArticle(name, description, category_id);
  
    if (article) {
        res.status(201).send(article);
    }else{
        res.status(409).send("Conflict, Запись не создана");
    }
}

export async function changeArticleHandler(req,res){

    const prevId = req.params.id;
    const artic = await getArticleById(prevId);
    console.log(artic);
    if(artic){
        const {id, name, description, category_id} = req.body;

        if ((!Number.isInteger(category_id)&&category_id!==null)||
            !Number.isInteger(id)
            || id < 0
        ){
            res.status(400).send("Bad Request");
            return;
        }
        const article = await changeArticle(prevId, id, name, description, category_id);
        console.log('Изменение записи, article = ', article);
   
        if (article) {
            res.status(200).send(article);
        }
        else{
            res.status(409).send("Conflict, Запись не создана");
        }
    }else{
        res.status(404).send("Совпадений не найдено");
    }
}


export async function deleteArticleHandler(req,res){
    const id = req.params.id;
    const artic = await getArticleById(id);
    console.log(artic)
    res.status(200).send(artic);
}
