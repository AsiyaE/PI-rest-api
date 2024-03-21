import mysql from 'mysql2';

import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE
}).promise();

export async function getArticles(){
    const result = await pool.query("SELECT * FROM Articles");
    return result[0];
};

export async function getArticleById(id){
    const [result] = await pool.query(`
    SELECT * FROM Articles
    WHERE id = ?
    `, [id]);
    return result[0];
};

export async function addArticle(name, description, category_id){
    //check category_id
    const [result] = await pool.query(`
        INSERT INTO Articles (name, description, category_id)
        VALUES (?, ?, ?)
        `, [name, description, category_id]
    );
    return {
        id: result.insertId,
        name,
        description,
        category_id
    };
}

const art = await getArticles();
const art1 = await getArticleById(1);
// console.log(art);
// console.log(art1);

// const newArt = await addArticle('New article', 'This article is about JS');
// console.log(newArt);