import mariadb from './MariaDB'

const insertBook = ` insert into BOOK (userid, PID, P_NAME,T_NAME,P_CLASS,B_STRDATE,B_ENDDATE,ADULT,MIDDLE,YOUNG,PRESCHOOL,TOTAL) VALUES(?,?,?,?,?,?,?,?,?,?,?,?) `

class Book {

    async insertBook (copyObject) {
        let conn;
        let cnt;
        try{
            conn = await mariadb.makeConn()

            let param = [copyObject.userid,copyObject.PID,copyObject.P_NAME,copyObject.T_NAME,copyObject.P_CLASS,copyObject.B_STRDATE,copyObject.B_ENDDATE,copyObject.ADULT,copyObject.MIDDLE,copyObject.YOUNG,copyObject.PRESCHOOL,copyObject.TOTAL]

            let result = await conn.query(insertBook,param)
            cnt =result.affectedRows

        }catch (e) {
            console.log(e)
        } finally {
            await mariadb.closeConn()
        }
        return cnt;
    }


}

export default Book;