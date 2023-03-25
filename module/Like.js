import mariadb from './MariaDB'


const selectLikeSql = `select email, PID from LIKES where email = ? `

const unlikeSql = ` delete from LIKES where PID = ? `

const likeSql = ` insert into LIKES (email,PID) values(?,?) `


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


    async delete(pid) {


        let conn;
        let unlikeChk
        let param = [pid]

        try {
            conn = await mariadb.makeConn()
            unlikeChk = await conn.query(unlikeSql,param);
            if (unlikeChk.affectedRows > 0) unlikeChk = true


        } catch(e) {

        } finally {
            await mariadb.closeConn(conn)
        }

        return unlikeChk
    }


    async insert(email,pid) {


        let conn;
        let likeChk
        let param = [email, pid]

        try {
            conn = await mariadb.makeConn()
            likeChk = await conn.query(likeSql,param);
            if (likeChk.affectedRows > 0) likeChk = true

        } catch(e) {

        } finally {
            await mariadb.closeConn(conn)
        }

        return likeChk
    }



}


export default Like