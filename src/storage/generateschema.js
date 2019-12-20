let config = require('../common/config.json')['storage'];
let mariadb = require('mariadb');
let fs = require('fs');

class GenerateSchema {
    constructor(branches) {
        this.branches = branches;
    }

    async file_sql(conn, name, item) {
        let sql = fs.readFileSync('./' + name + '/' + item).toString('utf8');
        try {
            await conn.query(sql);
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            console.log('Finishing file: ' + name + '@' + item);
        }

    }

    async generate(branch) {
        let lConfig = config[branch.name];
        console.log('Generating branch ' + branch.name + ' MariaDB@' + lConfig.host);
        // connect to the database
        let pool = mariadb.createPool({
            host: lConfig.host,
            user: 'root',
            password: lConfig.root_password,
            multipleStatements: true
        });

        let conn;

        try {
            conn = await pool.getConnection();

            console.log(branch.items.length);

            for (const item of branch.items) {
                await this.file_sql(conn, branch.name, item);
            }

            conn.end();
        } finally {
            console.log('Ending connection.');
            if (conn) conn.end();
            if (pool) pool.end();
        }
    }

    async execute() {
        for (let i in this.branches) {
            let branch = this.branches[i];
            try {
                await this.generate(branch)
                    .catch((err) => { console.log('Error', err); });
            } finally {
                console.log('Finishing.');
            }
        }
    }
}

module.exports = GenerateSchema;