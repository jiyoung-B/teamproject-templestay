const mariadb = require('../module/MariaDB');

let membersql = {
    insertsql : ' insert into member (userid, name, passwd) values (?,?,?) ',
    loginsql : ' select count(userid) cnt, name, userid from member ' +
        ' where userid = ? and passwd = ? ',
    selectOne: ' select mno, name, userid ' +
        ` date_format(regdate, "%Y-%m-%d %H:%i:%s") regdate ` +
        ' from member where userid = ? '
}


class Member {
    constructor(userid, name, passwd) {
        this.userid = userid;
        this.name = name;
        this.passwd = passwd;
    }

    // 회원정보 저장
    async insert() {
        console.log('insert문 실행');
        let conn = null;
        let params = [this.userid, this.name, this.passwd ];
        let result = -1;

        try {
            conn = await mariadb.makeConn();
            console.log('insert문 - db 연결중')
            result = await conn.query(membersql.insertsql, params);
            console.log('result - ', result);
            await conn.commit();
            if (result.affectedRows > 0) result = result.affectedRows;
            console.log('insert문 저장완료?')
        } catch (ex) {
            console.log(ex);
        } finally {
            await mariadb.closeConn(conn);
        }
        return result;
    }

    async login(uid, pwd) {  // 로그인 처리
        let conn = null;
        let params = [uid, pwd];
        let result = -1;

        try {
            conn = await mariadb.makeConn();
            result = await conn.query(membersql.loginsql, params);
        } catch (e) {
            console.log(e);
        } finally {
            await mariadb.closeConn();
        }

        return result;
    }

    async selectOne(uid) {  // 아이디로 검색된 회원의 모든 정보 조회
        let conn = null;
        let params = [uid];
        let result = -1;

        try {
            conn = await mariadb.makeConn();
            result = await conn.query(membersql.selectOne, params);
        } catch (e) {
            console.log(e);
        } finally {
            await mariadb.closeConn();
        }

        return result;
    }

};

module.exports = Member;