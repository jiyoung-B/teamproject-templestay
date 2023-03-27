import mariadb from './MariaDB';

let likeslistsql = {
    // selectLikeslist : ` select PID, T_NAME, P_NAME, ADDR from LIKES join PROGRAM3 using (PID) join TEMPLE3 using (T_NAME)
    //                     where email = ? `,
    selectLikeslist : ` select l.PID, T_NAME, P_NAME, ADDR, PR_CLASS, PRICE, P_DAY, P_TIME, P_CONTENT
                        from LIKES l join PROGRAM3 using (PID)
                                     join TEMPLE3 using (T_NAME)
                                     join PROGRAMPRICE3 using (P_NAME)
                                     join PROGRAMSCHEDULE3 using (P_NAME)
                        where email = ? group by l.PID `,
//     selectCompare : ` select distinct l.PID, T_NAME, p.P_NAME, ADDR, PRICE, P_CONTENT
// from LIKES l join PROGRAM3 p using (PID)
//     join PROGRAMSCHEDULE3 s using (PID)
// join PROGRAMPRICE3 using (PID)
// join TEMPLE3 using (T_NAME)
// where (email = ?)
// order by PID; `
}

// class Likeslist {
//     constructor(T_NAME, P_NAME, ADDR, PRICE, P_CONTENT) {
//         this.T_NAME = T_NAME;
//         this.P_NAME = P_NAME;
//         this.ADDR = ADDR;
//         this.PRICE = PRICE;
//         this.P_CONTENT = P_CONTENT;
//     }

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
            await mariadb.closeConn();
        }
        console.log('왜', likeslist)

        return likeslist;
    }

    // export default selectLikeslist

    // async selectCompare(email) {
    //     let conn = null;
    //     let params = [email];
    //     let comparelist = [];   // 결과 저장용
    //
    //     try {
    //         conn = await mariadb.makeConn();
    //         let comps = await conn.query(likeslistsql.selectCompare, params);
    //
    //         comparelist.push(comps)
    //
    //     } catch (e) {
    //         console.log(e);
    //     } finally {
    //         await mariadb.closeConn();
    //     }
    //
    //     return comparelist;
    // }
// }

export default selectLikeslist

// export default Likeslist
// module.exports = Likeslist;