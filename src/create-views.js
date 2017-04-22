
const createPuckView = (db) => {
    db.save('_design/pucks', {
        all: {
            map: function (doc) {
                if (doc.name && doc.datasetId && doc.status) {
                    emit(doc.name, doc);
                }
            }
        },
    });
};

const createDatasetView = (db) => {
    db.save('_design/datasets', {
        all: {
            map: function (doc) {
                if (doc.content && !doc.datasetId && !doc.status) {
                    emit(doc.name, doc);
                }
            }
        },
    });
};

const createTripView = (db) => {
    db.save('_design/trips', {
        all: {
            map: function (doc) {
                if (doc.pucks && !doc.datasetId && !doc.status) {
                    emit(doc.name, doc.pucks);
                }
            }
        },
    });
};

module.exports = {
    createDatasetView,
    createPuckView,
    createTripView
};