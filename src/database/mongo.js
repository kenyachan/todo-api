const {MongoMemoryServer} = require('mongodb-memory-server');
const MongoClient = require('mongodb').MongoClient;

let database = null;

async function startDatabase() {
    const mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();
    
    MongoClient.connect(uri, { useNewUrlParser: true}, (error, client) => {
      if(error) {
        return console.log("Connection failed for some reason");
      }
      console.log('Connection established');
      database = client.db();
  
    });
}

async function getDatabase() {
    if (!database) await startDatabase();
    return database;
}

module.exports = {
    getDatabase,
    startDatabase,
};