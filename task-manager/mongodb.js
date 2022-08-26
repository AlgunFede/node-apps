// require mongodb npm library (native driver). Nos permite conectar 
const { MongoClient, ObjectId } = require('mongodb');
// For initialize the connection

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (rej, client) => {
    if (rej) {
        return console.log('Error!', rej)
    }

    const db = client.db(databaseName);


    db.collection('tasks').deleteOne({
        _id: ObjectId("6304f667254f1f678d9f8cab")
    })



    // db.collection('tasks').insertMany([
    //     {
    //         description: 'lorem ipsum',
    //         done: true
    //     }, {
    //         description: 'lorem ipsuuuuum',
    //         done: false
    //     }
    // ], (error, result) => {
        
    //     if(error) {
    //         return console.log('Unable to insert documents')
    //     }

    //     console.log(result)
    // })
})