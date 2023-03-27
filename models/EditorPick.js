import mariadb from './MariaDB'

let editorSql ={
    selectEdPic : `select * from PROGRAMPIC2 where E_PICKTF = ?`
}
async function selectEdPic() {
    let conn = null;
    let param = [1];
    let edPickData = [];
    try {
        conn = await mariadb.makeConn();
        let editorpick = await conn.query(editorSql.selectEdPic, param);

        edPickData.push(editorpick)
        console.log('뭐라고가져오는데에디터픽??',editorpick)


    } catch (e) {
        console.log(e);
    } finally {
        await mariadb.closeConn(conn)
    }
    return edPickData;
}

export default selectEdPic;