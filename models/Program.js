import mariadb from './MariaDB'
import {milliFomatter} from "./Utils";
let programSql ={
    selectPro :` select P_NAME,T_NAME,P_CAUTION,P_STRDATE,P_ENDDATE,P_INTRO, P_LINK,P_CLASS from PROGRAM2 where PID = ? and P_ENDDATE > ?`,
    selectProPic : `select * from PROGRAMPIC2 where T_NAME = ?`,
    selectProPrice : `select DIVISION,PR_CLASS,PRICE from PROGRAMPRICE2 where PID = ? order by PR_NO`,
    selectProSchedule : ` select P_DAY, P_TIME,P_CONTENT from PROGRAMSCHEDULE2 where PID = ? ORDER BY PS_NO `,
    selectProDes : ` select P_DES, P_DETAIL from PROGRAMDES2 WHERE PID = ? ORDER BY PD_NO `
}

let tomorrow = milliFomatter(new Date().setDate(new Date().getDate() + 1));
async function selectPro(pid) {
    let conn = null;

    let ProData = [];

    try {
        conn = await mariadb.makeConn();

        let paramPid = [pid,tomorrow];
        let P_Meta = await conn.query(programSql.selectPro, paramPid);
        console.log('P_Meta',P_Meta)
        let paramTName = [await P_Meta[0].T_NAME]
        let P_PIC = await conn.query(programSql.selectProPic,paramTName)

        let P_PRI = await conn.query(programSql.selectProPrice,paramPid)

        let P_SCH = await conn.query(programSql.selectProSchedule,paramPid)

        let P_DES = await conn.query(programSql.selectProDes,paramPid)

        ProData.push(P_Meta)
        ProData.push(P_PIC)
        ProData.push(P_PRI)
        ProData.push(P_SCH)
        ProData.push(P_DES)

    } catch (e) {
        console.log(e);
    } finally {
        await mariadb.closeConn(conn)
    }
    return ProData
}

export default selectPro;