const {getDatabase} = require('./mongo');
const {ObjectId} = require('mongodb');

const collectionName = 'todoItems';

async function insertItem(item) {
    const database = await getDatabase();
    const {insertedItem} = await database.collection(collectionName).insertOne(item);
    return insertedItem;
}

async function getItems() {
    const database = await getDatabase();

    return await database.collection(collectionName).find({}).toArray();
}

async function deleteItem(id) {
    const database = await getDatabase();
    await database.collection(collectionName).deleteOne({
        _id: new ObjectId(id),
    });
}

async function updateItem(id, item) {
    const database = await getDatabase();
    delete item._id;
    await database.collection(collectionName).updateOne(
        { _id: new ObjectId(id), },
        {
            $set: {
                ...item,
            },
        },
    );
}

module.exports = {
    insertItem,
    getItems,
    deleteItem,
    updateItem,
}