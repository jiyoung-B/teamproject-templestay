import mariadb from './MariaDB'

let templeSql ={
    selectTemple :`select * from TEMPLE where T_NAME = ?`,
    selectTemplePic : `select * from TEMPLEPIC where T_NAME = ?`,
    selectTempleProPic : `select * from PROGRAMPIC where P_NAME LIKE %?%`
}

async function selectTemple(id) {  // 템플 정보 출력
    let conn = null;
    let params = [id];
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
        await mariadb.closeConn();
    }
    return {temple:templeData,templePic:templePicData, templeProPic :templeProPicData}
}

export default selectTemple;