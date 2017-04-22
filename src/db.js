const cradle = require('cradle'),
    filler = require('./fill-db'),
    viewCreator = require('./create-views');

const connection = new(cradle.Connection)('http://127.0.0.1', 5984);


const db = connection.database('snowflake');

db.exists((err, exists) => {
    if (err) {
        console.log('error', err);
    } else if (exists) {
        console.log('The database is already exists.');
        db.destroy();
    } else {
        console.log('Database does not exists.');
        db.create(err => {
            if (err) {
                console.log('Creation error', err);
            }
            filler.fillDatabase(db);
            viewCreator.createPuckView(db);
            viewCreator.createDatasetView(db);
            viewCreator.createTripView(db);
        });
    }
});


module.exports = db;