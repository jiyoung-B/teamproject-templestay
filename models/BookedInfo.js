import mariadb from './MariaDB'

let bookedInfoSql ={
    selectBookedInfo : ` select * from BOOK where EMAIL = ? `
}
async function bookInfo(email) {
    let conn = null;
    let param = [email];
    let bookedinfos = [];
    try {
        conn = await mariadb.makeConn();
        let bookedinfo = await conn.query(bookedInfoSql.selectBookedInfo, param);
        console.log('db북인포',bookedinfo)

        bookedinfos.push(bookedinfo)
        console.log('배열안db북인포',bookedinfos)

    } catch (e) {
        console.log(e);
    } finally {
        await mariadb.closeConn(conn)
    }
    return bookedinfos;
}

export default bookInfo;