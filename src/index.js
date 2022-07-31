const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const {startDatabase} = require('./database/mongo');
const {insertItem, getItems, deleteItem, updateItem} = require('./database/itemRepository');

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

app.get('/', async (req, res) => {
    res.send(await getItems());
});

app.post('/', async (req, res) => {
    const newItem = req.body;
    await insertItem(newItem);
    res.send({ message: 'New item inserted.'});
});

app.delete('/:id', async (req, res) => {
    await deleteItem(req.params.id);
    res.send({ message: 'Item removed.'});
});

app.put('/:id', async (req, res) => {
    const updatedItem = req.body;
    await updateItem(req.params.id, updatedItem);
    res.send({ message: 'Item updated.' });
});

startDatabase().then(async () => {
    app.listen(3001, () => {
        console.log('listening on port 3001');    
    });
});
