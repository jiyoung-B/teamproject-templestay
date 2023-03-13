import mariadb from "mariadb";

const dbconfig = {
    host : process.env.MARIADB_HOST,
    user : process.env.MARIADB_USER,
    password : process.env.MARIADB_PWD,
    database : process.env.MARIADB_DB
};


const MariaDB = {
    makeConn: async () => {
        try {
            return await mariadb.createConnection(dbconfig)
        } catch (e) { console.log(e); }
    },
    closeConn: async (conn) => {
        if (conn) {
            try { await conn.close(); }
            catch (e) { console.log(e); }
        }
    }
}

module.exports = MariaDB;