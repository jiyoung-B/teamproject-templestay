import mariadb from './MariaDB'

let indexSql =
    ` select p.P_NAME,p.PID,t.T_NAME,ADDR,P_CLASS, date_format(P_STRDATE, '%Y-%m-%d') P_STRDATE, date_format(P_ENDDATE, '%Y-%m-%d') P_ENDDATE,P_PICLINK
from TEMPLE2 t
INNER JOIN PROGRAM2 p ON t.T_NAME = p.T_NAME
INNER JOIN PROGRAMPIC2 pp on p.P_NAME = pp.P_NAME
WHERE t.REGION = ? `

let selectEditorPicSql = ` select p.P_NAME,p.PID,t.T_NAME,ADDR,P_CLASS, date_format(P_STRDATE, '%Y-%m-%d') P_STRDATE, date_format(P_ENDDATE, '%Y-%m-%d') P_ENDDATE,P_PICLINK, pp.E_PICKTF,t.REGION
from TEMPLE2 t
         INNER JOIN PROGRAM2 p ON t.T_NAME = p.T_NAME
         INNER JOIN PROGRAMPIC2 pp on p.P_NAME = pp.P_NAME
where E_PICKTF = 1 `;

let selectDateSql = ` select p.P_NAME,p.PID,t.T_NAME,ADDR,P_CLASS, date_format(P_STRDATE, '%Y-%m-%d') P_STRDATE, date_format(P_ENDDATE, '%Y-%m-%d') P_ENDDATE,P_PICLINK, pp.E_PICKTF, t.REGION
                        from TEMPLE2 t
                                 INNER JOIN PROGRAM2 p ON t.T_NAME = p.T_NAME
                                 INNER JOIN PROGRAMPIC2 pp on p.P_NAME = pp.P_NAME
                        WHERE (t.REGION = ?) and (p.P_STRDATE < ? AND p.P_ENDDATE > ?) `;




class Index {


    async editorPic () {
        let conn;
        let defaultData

        try {
            conn = await mariadb.makeConn();

            defaultData = await conn.query(selectEditorPicSql)

        } catch(e) {
            console.log(e)
        } finally {
            await mariadb.closeConn(conn);
        }
        return defaultData
    }

    async searchOne(lid,str) {
        let conn;
        let searchOneData;
        let param = []

        try{
            conn = await mariadb.makeConn();
            param = [lid,str,str];

            searchOneData = await conn.query(selectDateSql,param)

        }catch (e) {
            console.log(e)
        }finally {
            await mariadb.closeConn(conn);
        }

        return searchOneData
    }

    async searchDate (lid,str,end) {
        let conn;
        let searchData;
        let param = []


        try{
            conn = await mariadb.makeConn();
            param = [lid,str,end];

            searchData = await conn.query(selectDateSql,param)

        }catch (e) {
            console.log(e)
        }finally {
            await mariadb.closeConn(conn);
        }

        return searchData
    }

}



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
        await mariadb.closeConn(conn)
    }
   return indexData
}

export default Index;