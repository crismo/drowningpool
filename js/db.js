const {
    Pool,
    Client
} = require('pg');
const connectionString = process.env.DATABASE_URL;


const db = {}

function runQuery(query) {
    let respons = null;
    const client = new Client({
        connectionString: connectionString
    })

    try {
        client.connect()
        if (client) {
            client.query(query, (err, res) => {
                console.log(err, res)
                respons = res.rows;
                client.end()
            })

        };
    } catch (e) { /*OOPS*/ }

    return respons;
}
db.insert = function (query) {
    return runQuery(query);
}

db.select = function (query) {
    return runQuery(query);
}

db.delete = function (query) {
    //db.update(query);
    return runQuery(query);
}

db.update = function (query) {
    return runQuery(query);
}

module.exports = db