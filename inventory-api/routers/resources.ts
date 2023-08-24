import express from "express";
import mysqlDb from "../mysqlDb";
import {ApiResource, Resource} from "../types";
import {imagesUpload} from "../multer";
import {OkPacketParams} from "mysql2";

const  resourcesRouter = express.Router();

resourcesRouter.get('/', async (req, res) => {
    const connection =  mysqlDb.getConnection();
    const result = await connection.query('SELECT id, title, image,  description, place_id, category_id FROM resources');
    const resourcesList = result[0] as Resource[];
    res.send(resourcesList);
});
resourcesRouter.get('/:id', async (req, res) => {
    const connection =  mysqlDb.getConnection();
    const result = await connection.query(
        'SELECT * FROM resources WHERE id = ?', [req.params.id]);
    const resourcesList = result[0] as Resource[];
    const resources = resourcesList[0];
    if(!resources) {
        return res.status(404).send({ERROR: 'Resource not found!'});
    }
    res.send(resources);
});
resourcesRouter.post('/' ,imagesUpload.single('image') ,async (req, res) => {
    if(!req.body.title){
        return res.status(404).send({ERROR: 'Title field is required!'});
    }
    const resourcesData: ApiResource = {
        title: req.body.title,
        description: req.body.description,
        image: req.file ? req.file.filename : null,
        place_id: req.body.place_id,
        category_id: req.body.category_id
    }
    const connection =  mysqlDb.getConnection();
    const result = await connection.query(
        'INSERT INTO resources ' +
        '(title, description, image, place_id, category_id) VALUES (?, ?, ?, ?, ?)',
            [resourcesData.title,
            resourcesData.description,
            resourcesData.image,
            resourcesData.place_id,
            resourcesData.category_id,
            ]
    );
    const info = result[0] as OkPacketParams;
    res.send({
        ...resourcesData,
        id: info.insertId
    });
});
resourcesRouter.delete('/:id', async (req, res) => {
    await mysqlDb.getConnection().query(
        'DELETE FROM ?? WHERE id = ?',
        ['resources', req.params.id]
    );
    res.send(`Resource if = ${req.params.id}  was deleted!` );
});


export default  resourcesRouter;