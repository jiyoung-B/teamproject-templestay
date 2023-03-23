import mariadb from './MariaDB'

const selectPlusInfo = ` select P_NAME,T_NAME, P_CLASS from PROGRAM2 WHERE PID = ? `
const insertPreBookSql = ` insert into PREBOOK (userid,PID,P_NAME,T_NAME,P_CLASS,B_STRDATE,B_ENDDATE,ADULT,MIDDLE,YOUNG,PRESCHOOL) values (?,?,?,?,?,?,?,?,?,?,?) `
const selectPreBookSql = ` select * from PREBOOK where userid = ? order by PRB_NO desc `
const selectPreBookPriceSql = ` select PID, PR_CLASS, PRICE from PROGRAMPRICE2 where PID = ? `
const deletePreBook = ' delete from PREBOOK WHERE userid = ? '



class PreBook {

    async insertPreBook (userId, PID, strDate, endDate,  adult,  middle,  young,  preschool) {

        let conn = null;
        let result = -1;
        try {
            conn = await mariadb.makeConn();
            let plusInfo = await conn.query(selectPlusInfo,PID)

            let P_NAME = plusInfo[0].P_NAME
            let T_NAME = plusInfo[0].T_NAME
            let P_CLASS = plusInfo[0].P_CLASS

            let insertParam = [userId, PID, P_NAME, T_NAME, P_CLASS, strDate, endDate,  adult,  middle,  young,  preschool]

            result = await conn.query(insertPreBookSql,insertParam)
            await conn.commit()
            if (result.affectedRows > 0) result = result.affectedRows;

        } catch (e) {
            console.log(e)
        } finally {
            await mariadb.closeConn(conn)
        }
        return result
    }

    async selectPreBook (userid) {
        let conn;
        let param = [userid]
        let result =[];
        try{
            conn = await mariadb.makeConn();

            let bookInfo = await conn.query(selectPreBookSql,param)
            let priceParam = [bookInfo[0].PID]
            let priceInfo = await conn.query(selectPreBookPriceSql,priceParam)

          result.push(bookInfo)
          result.push(priceInfo)


        } catch (e) {
            console.log(e)
        } finally {
            await mariadb.closeConn(conn)
        }
        return result
    }

    async Delete (userid) {
        let conn;

        let param=[];
        let result;
        try{
            conn = await mariadb.makeConn()
            param = [userid]
            result = await conn.query(deletePreBook,param)
            if(result.affectedRows > 0) result = result.affectedRows
        } catch (e) {
            console.log(e)
        } finally {
            await mariadb.closeConn(conn)
        }
        return result;
    }

}





export default PreBook;