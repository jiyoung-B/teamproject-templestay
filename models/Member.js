const mariadb = require('./MariaDB');

let membersql = {
    insertsql : ' insert into member (passwd,name,email) ' +
        ' values (?,?,?) ',
    isEmailsql : ' select count(mno) cnt from member ' +
        ' where email= ? ',
    // loginsql : ' select count(mno) cnt, email, passwd, name from member where email= ? and passwd = ?',
     loginsql : ' select count(mno) cnt, email, passwd, name from member where email= ?',
    //loginsql : ' select email, passwd, name from member where email= ?',
    // loginsql : ' select count(mno) cnt, name, email from member ' +
    //     ' where email= ? and passwd = ? ',
    selectOne: ' select mno, name, email, ' +
        ` date_format(regdate, "%Y-%m-%d %H:%i:%s") regdate ` +
        ' from member where email = ? '
}

class Member {

    constructor( passwd, name, email) {
        this.passwd = passwd;
        this.name = name;
        this.email = email;
    }

    // 회원정보 저장
    async insert() {
        let conn = null;
        let params = [ this.passwd, this.name, this.email];
        let result = -1;

        try {
            conn = await mariadb.makeConn();
            result = await conn.query(membersql.insertsql, params);
            await conn.commit();
            if (result.affectedRows > 0) result = result.affectedRows;
        } catch (ex) {
            console.log(ex);
        } finally {
            await mariadb.closeConn(conn);
        }
        return result;
    }

    async isEmail(email) {  // 로그인 처리
        let conn = null;
        let params = [email];
        let result = -1;

        try {
            conn = await mariadb.makeConn();
            result = await conn.query(membersql.isEmailsql, params);
        } catch (e) {
            console.log(e);
        } finally {
            await mariadb.closeConn(conn);
        }
        return result;
    }

    async login(email) {  // 로그인 처리
        let conn = null;
        let params = [email];
        let result = -1;

        try {
            conn = await mariadb.makeConn();
            result = await conn.query(membersql.loginsql, params);
        } catch (e) {
            console.log(e);
        } finally {
            await mariadb.closeConn(conn)
        }

        return result;
    }

    async selectOne(email) {  // 아이디로 검색된 회원의 모든 정보 조회
        let conn = null;
        let params = [email];
        let result = -1;

        try {
            conn = await mariadb.makeConn();
            result = await conn.query(membersql.selectOne, params);
        } catch (e) {
            console.log(e);
        } finally {
            await mariadb.closeConn(conn)
        }

        return result;
    }

};

module.exports = Member;