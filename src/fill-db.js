const pucks = require('./pucks.json'),
    dataset = require('./dataset.json');


let pucksIds = [];
let datasetsIds = [];

let updatedDataset = () => {
    return dataset.map(data => {
        return {
            name: data.name,
            content: data.content,
            created: new Date(),
        }
    });
};

let updatedPucks = (datasetIds) => {
    return pucks.map(puck => {
        return {
            name: puck.name,
            status: puck.status,
            created: new Date(),
            datasetId: datasetIds[Math.floor(Math.random() * datasetIds.length)].id
        }
    });
};

let tripPucks = (puckIds) => {
    return puckIds.map(puck => {
        return {
            id: puck.id,
        }
    });
};

const fillDatabase = (db) => {
    db.save(updatedDataset(), (err, res) => {
        if (err) {
            console.log('saving document error', err);
        }
        datasetsIds = res;
        db.save(updatedPucks(datasetsIds), (err, res) => {
            if (err) {
                console.log('saving document error', err);
            }
            pucksIds = res;
            db.save({
                name: "Main Trip",
                created: new Date(),
                pucks: tripPucks(pucksIds)
            }, (err, res) => {
                if (err) {
                    console.log('saving document error', err);
                }
                console.log(res);
            });
        });
    });
};

module.exports = {
    fillDatabase
};



