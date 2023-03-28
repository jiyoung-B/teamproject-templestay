import mariadb from './MariaDB';

let likeslistsql = {
    // selectTemple : ' select T_NAME from LIKES join PROGRAM3 using (PID) where email = ? ',
    // selectProgram : ' select P_NAME from LIKES join PROGRAM3 using (PID) where email = ?',
    // selectAddr: ` select ADDR from LIKES join PROGRAM3 using (PID) join TEMPLE3 using (T_NAME) where email = ? `,
    // selectCount: ` select count(LK_NO) cnt from LIKES where email = ? `
    selectLikeslist : ` select T_NAME, P_NAME, ADDR from LIKES join PROGRAM3 using (PID) join TEMPLE3 using (T_NAME)
                        where email = ? `
}

// class Likeslist {
//     constructor(T_NAME, P_NAME, ADDR, LK_NO) {
//         this.T_NAME = T_NAME;
//         this.P_NAME = P_NAME;
//         this.ADDR = ADDR;
//         this.LK_NO = LK_NO;
//     }

    async function selectLikeslist(email) {
        let conn = null;
        let params = [email];
        // let result = '';
        let likeslist = [];   // 결과 저장용

        try {
            conn = await mariadb.makeConn();
            let likes = await conn.query(likeslistsql.selectLikeslist, params);

            // 조회수 증가 코드
            // await conn.query(boardsql.viewOne, params);
            // await conn.commit();

            likeslist.push(likes)

        } catch (e) {
            console.log(e);
        } finally {
            await mariadb.closeConn(conn)
        }
        console.log(`plz: `, likeslist)

        return likeslist;
    }

    export default selectLikeslist

//     async selectCount(email) {
//         let conn = null;
//         let params = [email];
//         let result = '';
//
//         try {
//             conn = await mariadb.makeConn();
//             result = await conn.query(likeslistsql.selectCount, params);
//         } catch (e) {
//             console.log(e);
//         } finally {
//             await mariadb.closeConn();
//         }
//
//         return result;
//     }
// }