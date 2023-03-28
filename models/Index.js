import mariadb from './MariaDB'
import {milliFomatter} from "./Utils";

let localSql =
    ` select p.P_NAME,p.PID,t.T_NAME,ADDR,P_CLASS, date_format(P_STRDATE, '%Y-%m-%d') P_STRDATE, date_format(P_ENDDATE, '%Y-%m-%d') P_ENDDATE,P_PICLINK,t.REVIEWCNT
from TEMPLE2 t
INNER JOIN PROGRAM2 p ON t.T_NAME = p.T_NAME
INNER JOIN PROGRAMPIC2 pp on p.P_NAME = pp.P_NAME
WHERE t.REGION = ? and p.P_ENDDATE > ?
ORDER by REVIEWCNT DESC `

let selectEditorPicSql = ` select p.P_NAME,p.PID,t.T_NAME,ADDR,P_CLASS, date_format(P_STRDATE, '%Y-%m-%d') P_STRDATE, date_format(P_ENDDATE, '%Y-%m-%d') P_ENDDATE,P_PICLINK, pp.E_PICKTF,t.REGION,t.REVIEWCNT
from TEMPLE2 t
         INNER JOIN PROGRAM2 p ON t.T_NAME = p.T_NAME
         INNER JOIN PROGRAMPIC2 pp on p.P_NAME = pp.P_NAME
where E_PICKTF = 1 and p.P_ENDDATE > ? ORDER by REVIEWCNT DESC `;

let selectLNDateSql = ` select p.P_NAME,p.PID,t.T_NAME,ADDR,P_CLASS, date_format(P_STRDATE, '%Y-%m-%d') P_STRDATE, date_format(P_ENDDATE, '%Y-%m-%d') P_ENDDATE,P_PICLINK, pp.E_PICKTF, t.REGION,t.REVIEWCNT
                        from TEMPLE2 t
                                 INNER JOIN PROGRAM2 p ON t.T_NAME = p.T_NAME
                                 INNER JOIN PROGRAMPIC2 pp on p.P_NAME = pp.P_NAME
                        WHERE (t.REGION = ?) and (p.P_STRDATE < ? AND p.P_ENDDATE > ?) ORDER by REVIEWCNT DESC `;

let selectDateSql = ` select p.P_NAME,p.PID,t.T_NAME,ADDR,P_CLASS, date_format(P_STRDATE, '%Y-%m-%d') P_STRDATE, date_format(P_ENDDATE, '%Y-%m-%d') P_ENDDATE,P_PICLINK, pp.E_PICKTF, t.REGION,t.REVIEWCNT
from TEMPLE2 t
         INNER JOIN PROGRAM2 p ON t.T_NAME = p.T_NAME
         INNER JOIN PROGRAMPIC2 pp on p.P_NAME = pp.P_NAME
WHERE (p.P_STRDATE < ? AND p.P_ENDDATE > ?) ORDER by REVIEWCNT DESC `

let selectDefault = ` select p.P_NAME,p.PID,t.T_NAME,ADDR,P_CLASS, date_format(P_STRDATE, '%Y-%m-%d') P_STRDATE, date_format(P_ENDDATE, '%Y-%m-%d') P_ENDDATE,P_PICLINK, pp.E_PICKTF,t.REGION
                      from TEMPLE2 t
                               INNER JOIN PROGRAM2 p ON t.T_NAME = p.T_NAME
                               INNER JOIN PROGRAMPIC2 pp on p.P_NAME = pp.P_NAME
                      where p.P_ENDDATE > ?`


let tomorrow = milliFomatter(new Date().setDate(new Date().getDate() + 1));



class Index {

    constructor(lid,str,end) {
        this.lid = lid
        this.str = str
        this.end = end
    }


    async default () { // 검사 완
        let conn;
        let defaultData

        try {
            conn = await mariadb.makeConn();
            let param = [tomorrow]

            defaultData = await conn.query(selectDefault,param)

        } catch(e) {
            console.log(e)
        } finally {
            await mariadb.closeConn(conn);
        }
        return defaultData
    }

    async searchLNOne() {
        let conn;
        let searchOneData;
        let param = [this.lid,this.str,this.str]

        try{
            conn = await mariadb.makeConn();

            searchOneData = await conn.query(selectLNDateSql,param)

        }catch (e) {
            console.log(e)
        }finally {
            await mariadb.closeConn(conn);
        }

        return searchOneData
    }

    async searchLNDate () {
        let conn;
        let searchData;
        let param = [this.lid,this.str,this.end]

        try{
            conn = await mariadb.makeConn();

            searchData = await conn.query(selectLNDateSql,param)

        }catch (e) {
            console.log(e)
        }finally {
            await mariadb.closeConn(conn);
        }

        return searchData
    }

    async selectLocal() { // 검사 완
        let conn = null;

        let indexData
        let param = [this.lid,tomorrow];
        try {
            conn = await mariadb.makeConn();


            indexData = await conn.query(localSql, param);

        } catch (e) {
            console.log(e);
        } finally {
            await mariadb.closeConn(conn)
        }
        return indexData
    }

    async searchDate() {
        let conn = null;

        let indexData
        let param = [this.str,this.end];
        try {
            conn = await mariadb.makeConn();


            indexData = await conn.query(selectDateSql, param);

        } catch (e) {
            console.log(e);
        } finally {
            await mariadb.closeConn(conn)
        }
        return indexData
    }

    async searchOne() { // 문제
        let conn = null;

        let indexData
        let param = [this.str,this.str];

        try {
            conn = await mariadb.makeConn();
            indexData = await conn.query(selectDateSql, param);

        } catch (e) {
            console.log(e);
        } finally {
            await mariadb.closeConn(conn)
        }
        return indexData

    }

}


export default Index;