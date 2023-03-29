import mariadb from './MariaDB'

let editorSql ={
    selectEdPic : `select * from PROGRAMPIC2 where E_PICKTF = ?`,
    selectOneEdPic : `select * from PROGRAMPIC2 where E_PICKTF = ?`
}
async function selectEdPic(id) {
    let conn = null;

    let param = [2]; // [id] 일단 하드코딩함.
    let edPickData = [];
    try {
        conn = await mariadb.makeConn();
        let editorpick = await conn.query(editorSql.selectEdPic, param);

        edPickData.push(editorpick)

    } catch (e) {
        console.log(e);
    } finally {
        await mariadb.closeConn(conn)
    }
    return edPickData;
}

export default selectEdPic;