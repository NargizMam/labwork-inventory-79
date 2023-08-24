import express from "express";
import mysqlDb from "../mysqlDb";
import {ApiCategory, Category} from "../types";

const categoriesRouter = express.Router();

categoriesRouter.get('/', async (req, res) => {
    const connection =  mysqlDb.getConnection();
    const result = await connection.query('SELECT id, title, description FROM categories');
    const categoriesList = result[0] as Category[];
    res.send(categoriesList);
});
categoriesRouter.get('/:id', async (req, res) => {
    const connection =  mysqlDb.getConnection();
    const result = await connection.query(
        'SELECT * FROM categories WHERE id = ?', [req.params.id]);
    const categoriesList = result[0] as Category[];
    const category = categoriesList[0];
    if(!category) {
        return res.status(404).send({ERROR: 'Category not found!'});
    }
    res.send(category);
});
categoriesRouter.post('/' ,async (req, res) => {
    if(!req.body.title){
        return res.status(404).send({ERROR: 'Title field is required!'});
    }
    const categoryData: ApiCategory = {
        title: req.body.title,
        description: req.body.description
    }
    const connection =  mysqlDb.getConnection();
    await connection.query(
        'INSERT INTO categories (title, description) VALUES (?, ?)',
        [categoryData.title, categoryData.description]
    );
    res.send({
        ...categoryData
    });
});
categoriesRouter.delete('/:id', async (req, res) => {
    await mysqlDb.getConnection().query(
        'DELETE FROM ?? WHERE id = ?',
        ['categories', req.params.id]
    );
    res.send(`Category if = ${req.params.id}  was deleted!` );
});


export default categoriesRouter;