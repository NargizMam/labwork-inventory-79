import express from "express";
import mysqlDb from "../mysqlDb";
import {ApiPlace, Place} from "../types";

const placesRouter = express.Router();

placesRouter.get('/', async (req, res) => {
    const connection =  mysqlDb.getConnection();
    const result = await connection.query('SELECT id, title, description FROM places');
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
    if(!req.body.title){
        return res.status(404).send({ERROR: 'Title field is required!'});
    }
    const placesData: ApiPlace = {
        title: req.body.title,
        description: req.body.description
    }
    const connection =  mysqlDb.getConnection();
    await connection.query(
        'INSERT INTO places (title, description) VALUES (?, ?)',
        [placesData.title, placesData.description]
    );
    res.send({
        ...placesData
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