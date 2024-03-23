import mysql from 'mysql2';

import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
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

export async function getArticleByMatch(str){
    const search = `'%${str}%'`;
    const catParam = isNaN(Number(str)) ? -1 : Number(str);
    const [result] = await pool.query(`
        SELECT * FROM Articles
        WHERE name LIKE CONCAT('%', ?,  '%')
        OR description LIKE CONCAT('%', ?,  '%')
        OR category_id=?
    `,[str,str, catParam]); 
    console.log(result);
    return result;
};

export async function addArticle(name, description, category_id){
    const [result] = await pool.query(`
        INSERT INTO Articles (name, description, category_id)
        VALUES (?, ?, ?)
        `, [name, description, category_id]
    );

    if (result.affectedRows>0) 
        return {
            id:result.insertId,
            name,
            description,
            category_id
        };
    return null;
};

export async function changeArticle(prevId, id, name, description, category_id){

    const [result] = await pool.query(`
        UPDATE Articles 
        SET id=?, name=?, description=?, category_id=?
        WHERE id=?
        `, 
        [   id,
            name,
            description,
            category_id,
            prevId
        ]
    );
    if (result.affectedRows>0) 
        return {
            id,
            name,
            description,
            category_id
        };
    return null;
    
}
