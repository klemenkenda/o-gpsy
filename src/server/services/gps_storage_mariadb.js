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
            let px = parseFloat(x);
            let py = parseFloat(y);
            let pt = parseInt(t);

            let query = `
                insert into points
                (runner_id, ts, lat, lon)
                values (
                    (select runners.id from trackers, runners
                        where trackers.id = runners.tracker_id),
                    FROM_UNIXTIME(?), ?, ?
                )
            `;

            await conn.query(query, [pt, px, py]);

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