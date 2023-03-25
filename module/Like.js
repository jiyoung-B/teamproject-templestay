import mariadb from './MariaDB'


const selectLikeSql = `select email, PID from LIKES where email = ? `


class Like {

    constructor(email) {
        this.email = email
    }

    async select () {

        let conn;
        let likeData
        let param

        try {
            conn = await mariadb.makeConn();

            param = [this.email]
            likeData = await conn.query(selectLikeSql,param)

        } catch(e) {
            console.log(e)
        } finally {
            await mariadb.closeConn(conn)
        }
        return likeData;
    }

}


export default Like