import express from 'express';
import cors from 'cors';
import mysqlDb from "./mysqlDb";
import categoriesRouter from "./routers/categories";
import placesRouter from "./routers/places";

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.static('public'));
app.use(cors());
app.use('/categories', categoriesRouter);
app.use('/places', placesRouter);
const run = async () => {
    await mysqlDb.init();
    app.listen(port, () => {
        console.log('Server working on port ' + port + ' !');
    });
};

run().catch(console.error);
