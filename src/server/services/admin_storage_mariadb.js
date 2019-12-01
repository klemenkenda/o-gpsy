let mariadb = require('mariadb');

class MariaDBAdminStorageService {

    constructor() {
        this.config = require('../../common/config.json').storage.ogpsy;
        // connecting to DB
        this.pool = mariadb.createPool({
            host: this.config.host,
            user: this.config.user,
            password: this.config.password,
            multipleStatements: true
        });
    }

    async getEvents(user_id) {
        let conn;

        try {
            conn = await this.pool.getConnection();
            await conn.query('use ' + this.config.db);

            let query;
            let records = [];
            // return all public events (GUI)
            if (user_id === null) {
                query = `
                    select * from events

                `;
                records = await conn.query(query);
            } else {
            // or return all users events
                query = `
                    select * from events
                    where user_id = ?
                `;
                records = await conn.query(query, [user_id]);
            }

            return(records);

        } catch(err) {
            console.log(err);
            throw(err);
        } finally {
            if (conn) conn.end();
        }
    }

};

module.exports = MariaDBAdminStorageService;