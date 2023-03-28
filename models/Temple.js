import mariadb from './MariaDB'
import {milliFomatter} from "./Utils";

// 지금은 like 검색이지만, 프로그램 관련 테이블을 다시 만들때는 꼭! 사찰이름을 넣어야 한다.
let templeSql ={
    selectTemple :`select * from TEMPLE2 where T_NAME = ?`,
    selectTemplePic : `select * from TEMPLEPIC2 where T_NAME = ?`,
    selectTempleProPic : ` select T_NAME,p.PID,pp.P_NAME,pp.E_PICKTF,P_PICLINK from PROGRAMPIC2 pp join PROGRAM2 p USING(T_NAME) where T_NAME = ? and P_ENDDATE > ? `
}
let tomorrow = milliFomatter(new Date().setDate(new Date().getDate() + 1));
async function selectTemple(id) {  // 템플 정보 출력
    let conn = null;
    let params = [id,tomorrow];
    let templeData = ''; // 결과 저장용
    let templePicData = '';
    let templeProPicData = '';

    try {
        conn = await mariadb.makeConn();

        templeData = await conn.query(templeSql.selectTemple, params);
        templePicData = await conn.query(templeSql.selectTemplePic, params);
        templeProPicData = await conn.query(templeSql.selectTempleProPic,params)


    } catch (e) {
        console.log(e);
    } finally {
        await mariadb.closeConn(conn)
    }
    return {temple:templeData,templePic:templePicData, templeProPic :templeProPicData}
}

export default selectTemple;