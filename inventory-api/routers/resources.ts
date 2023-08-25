import express from "express";
import mysqlDb from "../mysqlDb";
import {ApiResource, Resource, ResourceInfo, ResourceUpdate} from "../types";
import {imagesUpload} from "../multer";
import {OkPacketParams} from "mysql2";

const  resourcesRouter = express.Router();

resourcesRouter.get('/', async (_, res) => {
    const connection =  mysqlDb.getConnection();
    const result = await connection.query('SELECT id, title, category_id, place_id FROM resources');
    const resourcesList = result[0] as Resource[];
    res.send(resourcesList);
});
resourcesRouter.get('/:id', async (req, res) => {
    const connection =  mysqlDb.getConnection();
    const result = await connection.query(
        `SELECT resources.title, resources.description, resources.image, 
         categories.categoriesTitle, places.placesTitle 
         FROM resources
         JOIN categories  ON resources.category_id = categories.id
         JOIN places ON resources.place_id = places.id 
         WHERE resources.id = ?`, [req.params.id]);

    const resource = result[0] as ResourceInfo[];
    const resourcesData: ResourceInfo = {
        title: resource[0].title,
        description: resource[0].description,
        image: resource[0].image,
        placesTitle: resource[0].placesTitle,
        categoriesTitle: resource[0].categoriesTitle
    }
    if(!resourcesData) {
        return res.status(404).send({ERROR: 'Resource not found!'});
    }
    res.send(resourcesData);
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
resourcesRouter.put('/:id' ,imagesUpload.single('image') ,async (req, res) => {
    if(!req.body.title){
        return res.status(404).send({ERROR: 'Title field is required!'});
    }
    const resourcesData: ResourceUpdate = {
        title: req.body.title,
        description: req.body.description,
        image: req.file ? req.file.filename : null,
    }
    const connection =  mysqlDb.getConnection();
    const result = await connection.query(
        `UPDATE resources SET  title = ?, description = ?, image = ? WHERE resources.id = ${req.params.id}`,
        [resourcesData.title,
            resourcesData.description,
            resourcesData.image
        ]
    );
    res.send(result);
});
resourcesRouter.delete('/:id', async (req, res) => {
    await mysqlDb.getConnection().query(
        'DELETE FROM ?? WHERE id = ?',
        ['resources', req.params.id]
    );
    res.send(`Resource if = ${req.params.id}  was deleted!` );
});


export default  resourcesRouter;