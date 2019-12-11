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

    async getLogin(username, password) {
        let conn;

        try {
            conn = await this.pool.getConnection();
            await conn.query('use ' + this.config.db);

            let query = `select * from users where username = ? and password = ?`;
            let r = await conn.query(query, [username, password]);
            return (r);
        } catch (err) {
            console.log(err);
            throw (err);
        } finally {
            if (conn) conn.end();
        }

    }

    async getEvent(event_id) {
        let conn;

        try {
            conn = await this.pool.getConnection();
            await conn.query('use ' + this.config.db);

            let query = `
                select * from events
                where id = ?
            `;
            let records = await conn.query(query, [event_id]);

            return (records);
        } catch (err) {
            console.log(err);
            throw (err);
        } finally {
            if (conn) conn.end();
        }
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

            return (records);

        } catch (err) {
            console.log(err);
            throw (err);
        } finally {
            if (conn) conn.end();
        }
    }

    async getMaps(user_id) {
        let conn;

        try {
            conn = await this.pool.getConnection();
            await conn.query('use ' + this.config.db);

            let maps = [];

            if (user_id === null) {
                maps = await conn.query(`select * from maps`);
            } else {
                let query = `
                    select * from maps
                    where user_id = ?
                `;
                maps = await conn.query(query, [user_id]);
            }

            return maps;

        } catch (err) {
            console.log(err);
            throw (err);
        } finally {
            if (conn) conn.end();
        }
    }

    async addMap(map) {
        let conn;

        try {
            conn = await this.pool.getConnection();
            await conn.query('use ' + this.config.db);

            let { insertId } = await conn.query(`insert into maps (name, filename, coordinates) VALUES (?, ?, ?)`, [map.name, map.filename, map.coordinates]);
            return await conn.query(`select * from maps where id = ?`, [insertId]);

        } catch (err) {
            console.log(err);
            throw (err);
        } finally {
            if (conn) conn.end();
        }
    }

    async editMap(map) {
        let conn;

        try {
            conn = await this.pool.getConnection();
            await conn.query('use ' + this.config.db);

            await conn.query(`update maps set name = ?, filename = ?, coordinates = ? where id = ?`, [map.name, map.filename, map.coordinates, map.id]);
            return await conn.query(`select * from maps where id = ?`, [map.id]);

        } catch (err) {
            console.log(err);
            throw (err);
        } finally {
            if (conn) conn.end();
        }
    }

    async deleteMap(id) {
        let conn;

        try {
            conn = await this.pool.getConnection();
            await conn.query('use ' + this.config.db);

            let map = await conn.query(`select * from maps where id = ?`, [id]);
            await conn.query(`delete from maps where id = ?`, [id]);
            return map

        } catch (err) {
            console.log(err);
            throw (err);
        } finally {
            if (conn) conn.end();
        }
    }



};

module.exports = MariaDBAdminStorageService;