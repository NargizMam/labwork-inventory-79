import express from "express";
import mysqlDb from "../mysqlDb";
import {ApiPlace, Place} from "../types";
import {OkPacketParams} from "mysql2";

const placesRouter = express.Router();

placesRouter.get('/', async (req, res) => {
    const connection =  mysqlDb.getConnection();
    const result = await connection.query('SELECT id, placesTitle, description FROM places');
    const placesList = result[0] as Place[];
    res.send(placesList);
});
placesRouter.get('/:id', async (req, res) => {
    const connection =  mysqlDb.getConnection();
    const result = await connection.query(
        'SELECT * FROM places WHERE id = ?', [req.params.id]);
    const placesList = result[0] as Place[];
    const place = placesList[0];
    if(!place) {
        return res.status(404).send({ERROR: 'Place not found!'});
    }
    res.send(place);
});
placesRouter.post('/' ,async (req, res) => {
    if(!req.body.placesTitle){
        return res.status(404).send({ERROR: 'Title field is required!'});
    }
    const placesData: ApiPlace = {
        placesTitle: req.body.title,
        description: req.body.description
    }
    const connection =  mysqlDb.getConnection();
    const result =  await connection.query(
        'INSERT INTO places (title, description) VALUES (?, ?)',
        [placesData.placesTitle, placesData.description]
    );
    const info = result[0] as OkPacketParams;
    res.send({
        ...placesData,
        id: info.insertId
    });
});
placesRouter.delete('/:id', async (req, res) => {
    await mysqlDb.getConnection().query(
        'DELETE FROM ?? WHERE id = ?',
        ['places', req.params.id]
    );
    res.send(`Place if = ${req.params.id}  was deleted!` );
});


export default placesRouter;