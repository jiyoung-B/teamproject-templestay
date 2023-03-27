import mariadb from './MariaDB'
import {milliFomatter} from "./Utils";

let selectEditorPicSql = ` select p.P_NAME,p.PID,t.T_NAME,ADDR,P_CLASS, date_format(P_STRDATE, '%Y-%m-%d') P_STRDATE, date_format(P_ENDDATE, '%Y-%m-%d') P_ENDDATE,P_PICLINK, pp.E_PICKTF,t.REGION
from TEMPLE2 t
         INNER JOIN PROGRAM2 p ON t.T_NAME = p.T_NAME
         INNER JOIN PROGRAMPIC2 pp on p.P_NAME = pp.P_NAME
where E_PICKTF = ? and p.P_ENDDATE > ? `;

let tomorrow = milliFomatter(new Date().setDate(new Date().getDate() + 1));
class EditorPick {

    async selectEdPic(epic) {
        let conn = null;
        let param = [epic,tomorrow];
        let edPickData;
        try {
            conn = await mariadb.makeConn();
            let editorPick = await conn.query(selectEditorPicSql, param);

            edPickData = editorPick

        } catch (e) {
            console.log(e);
        } finally {
            await mariadb.closeConn(conn)
        }
        return edPickData;
    }

}

export default EditorPick;