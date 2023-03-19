import mariadb from './MariaDB'

let indexSql =
    ` select p.P_NAME,p.PID,t.T_NAME,ADDR,P_CLASS, date_format(P_STRDATE, '%Y-%m-%d') P_STRDATE, date_format(P_ENDDATE, '%Y-%m-%d') P_ENDDATE,P_PICLINK
from TEMPLE2 t
INNER JOIN PROGRAM2 p ON t.T_NAME = p.T_NAME
INNER JOIN PROGRAMPIC2 pp on p.P_NAME = pp.P_NAME
WHERE t.REGION = ? `

async function selectIndex(lid) {
    let conn = null;

    let indexData
    try {
        conn = await mariadb.makeConn();

        let param = [lid];
        indexData = await conn.query(indexSql, param);

    } catch (e) {
        console.log(e);
    } finally {
        await mariadb.closeConn();
    }
   return indexData
}

export default selectIndex;