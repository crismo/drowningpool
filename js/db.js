const {
    Pool,
    Client
} = require('pg');
const connectionString = process.env.DATABASE_URL;


const db = {}

async function runQuery(query) {
    let respons = null;
    const client = new Client({
        connectionString:connectionString,
        ssl: true
    })

    try {
        
        // Wait untill we have a connection to the database
        await client.connect()

        // Waite untill the prommise has completed
        let res = await client.query(query).then(function (res) {
            // If you want to manipulate the respons it can be done in her.
            return res;
        }).catch(function (err) {
            console.log(err);
        });

        respons = res.rows;
      
    } catch (e) {
        console.log("Error ");
        console.log(e);
        /*OOPS*/
    }

    return respons;

}
db.insert = async function (query) {
    return await runQuery(query);
}

db.select = async function (query) {
    return await runQuery(query);
}

db.delete = async function (query) {
    //db.update(query);
    return await runQuery(query);
}

db.update = async function (query) {
    return await runQuery(query);
}

module.exports = db