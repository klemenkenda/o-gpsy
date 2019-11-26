let mariadb = require('mariadb');

class MariaDBGPSStorageService {

    constructor() {
        this.config = require('../../common/config.json').storage.ogpsy;
    }

    async addGPS(u, p, x, y, t) {
        let conn;
        let pool;

        try {
            // connecting to DB
            pool = mariadb.createPool({
                host: this.config.host,
                user: this.config.user,
                password: this.config.password,
                multipleStatements: true
            });
            conn = await pool.getConnection();
            await conn.query('use ' + this.config.db);

            // create record
            let record = x + "," + y + "," + t + ";";

            // insert into db
            let query = `update
                runners, trackers
            set
                runners.track = if(runners.track IS NULL, ?, concat(runners.track, ?))
            where
                trackers.id = runners.tracker_id
            `;
            await conn.query(query, [record, record]);

        } catch(err) {
            console.log(err);
            throw(err);
        } finally {
            if (conn) conn.end();
            if (pool) pool.end();
        }
    };

};

module.exports = MariaDBGPSStorageService;