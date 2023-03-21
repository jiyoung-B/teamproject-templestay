
import bcrypt from "bcryptjs";
// 이미지가 로드되지 않을 경우 onError 이벤트 처리를 위한 함수.
// ex
// <img src='에러발생' onError ={handleImgError} />
const handleImgError = (e) => {
    e.target.src = `https://www.templestay.com/images/templeinfo-00.jpg`
};


const milliFomatter = (millisecond) => {
    const tomorrow = new Date(millisecond);
    const year = tomorrow.getFullYear();
    const month = (tomorrow.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 +1을 해준 후 문자열로 변환하고 2자리로 맞춰줍니다.
    const date = tomorrow.getDate().toString().padStart(2, "0"); // 일도 문자열로 변환하고 2자리로 맞춰줍니다.
    const formattedDate = `${year}-${month}-${date}`; // 년, 월, 일을 하이픈으로 이어서 문자열로 만듭니다.

    return formattedDate }


const process_submit = async (url, data) => {
    const bodydata = JSON.stringify(data)
    console.log(bodydata);
    const cnt = fetch(url, {
        method: 'POST', mode: 'cors',
        body: bodydata,
        // body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'},
    }).then(res => console.log('알이에스 -', res));
    return await cnt;
};


// 암호 입력시 해시함수에 의해 해시코드로 변환된 암호 생성
const hashPassword = async (passwd) => {
    let saltRounds = 10
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(passwd, salt);
        console.log('hashpwd -', hash, passwd, salt);

        return hash;
    } catch (err){
        console.log(err);
    }

}

// ex)
//
const dateFomatter = (UTFdate) => {
    let result;
    try{
        const year = UTFdate.getFullYear();
        const month = (UTFdate.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 +1을 해준 후 문자열로 변환하고 2자리로 맞춰줍니다.
        const date = UTFdate.getDate().toString().padStart(2, "0"); // 일도 문자열로 변환하고 2자리로 맞춰줍니다.
        result = `${year}-${month}-${date}`; // 년, 월, 일을 하이픈으로 이어서 문자열로 만듭니다.
    }catch (e) {
        return null
    }

    return result
}



module.exports = {  handleImgError, milliFomatter, dateFomatter }