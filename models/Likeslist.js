import mariadb from './MariaDB';

let likeslistsql = {
    selectLikeslist : ` select l.PID, T_NAME, P_NAME, ADDR, PR_CLASS, PRICE, P_DAY, P_TIME, P_CONTENT
                        from LIKES l join PROGRAM3 using (PID)
                                     join TEMPLE3 using (T_NAME)
                                     join PROGRAMPRICE3 using (P_NAME)
                                     join PROGRAMSCHEDULE3 using (P_NAME)
                        where email = ? `,
}
    async function selectLikeslist(email) {
        let conn = null;
        let params = [email];
        let likeslist = [];   // 결과 저장용

        try {
            conn = await mariadb.makeConn();
            let likes = await conn.query(likeslistsql.selectLikeslist, params);

            likeslist.push(likes)

        } catch (e) {
            console.log(e);
        } finally {
            await mariadb.closeConn(conn)
        }

        return likeslist;
    }

export default selectLikeslist

