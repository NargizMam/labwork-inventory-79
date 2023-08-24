import express from 'express';
import cors from 'cors';
import mysqlDb from "./mysqlDb";
import categoriesRouter from "./routers/categories";
import placesRouter from "./routers/places";
import resourcesRouter from "./routers/resources";

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.static('public'));
app.use(cors());
app.use('/categories', categoriesRouter);
app.use('/places', placesRouter);
app.use('/resources', resourcesRouter);
const run = async () => {
    await mysqlDb.init();
    app.listen(port, () => {
        console.log('Server working on port ' + port + ' !');
    });
};

run().catch(console.error);
