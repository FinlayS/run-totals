const { MongoClient, ObjectID } = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'run-totals'

MongoClient.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
  if (error) {
    return console.log("unable to connect to mongoDB")
  }

  const db = client.db(databaseName)


db.collection('users').deleteMany( {
    age: 27
  }).then((result) => {
    console.log(result)
  }).catch((error) => {
    console.log(error)
  })

})