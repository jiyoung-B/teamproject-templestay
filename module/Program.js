import mariadb from './MariaDB'

// LIKE 검색을 쓰지 않도록 하는 것이 좋다.
// url을 한글로 하기 어려우므로, 키를 만들어 보자.
// 이미지를 저장할때 ?timestamp=.. 을 제거한다.
// 프로그램에 항상 PID를 넣어보자!

let programSql ={
    selectPro :` select * from PROGRAM where PID = ?`,
    selectProPic : `select * from PROGRAMPIC where P_NAME = ?`,
    selectProPrice : `select DIVISION,PRICECLASS,PRICE from PROGRAMPRICE where PID = ?`,
    selectProSchedule : ` select * from PROGRAMSCHEDULE where P_NAME = ?`,
    selectOtherPro : `select P_NAME, P_PICLINK, PID from PROGRAMPIC where T_NAME = ?`
}

async function selectPro(pid) {  // 프로그램 정보 출력
    let conn = null;

    let likeParams = ['%['+pid+']%']
    let ProData = []; // 결과 저장용
    let ProPicData = '';
    let ProScheduleData = '';
    let OtherProPic = '';

    try {
        conn = await mariadb.makeConn();

        let paramPid = [pid];
        let ProInfo = await conn.query(programSql.selectPro, paramPid);

        let paramPName = [await ProInfo[0].P_NAME]
        let ProPic = await conn.query(programSql.selectProPic,paramPName)

        let ProPrice = await conn.query(programSql.selectProPrice,paramPid)

        let paramTNAME = [await ProInfo[0].T_NAME]
        let OtherPro = await conn.query(programSql.selectOtherPro,paramTNAME)

        ProData.push(ProInfo)
        ProData.push(ProPic)
        ProData.push(ProPrice)
        ProData.push(OtherPro)

    } catch (e) {
        console.log(e);
    } finally {
        await mariadb.closeConn();
    }
    return ProData
}

export default selectPro;