import axios from "axios";
import bcrypt from "bcryptjs";

// <<<<<<< HEAD
// 이하 날짜를 변환 하는 함수

// UTF 형식으로 저장되면 DB의 날짜와 서버에 표시되는 날짜가 차이나는 경우가 있다. 이것을 해결하는 함수이다.
// 예를들어
// db에는 2023-03-22로 저장되었는데, 가져와보면 '2023-03-21T15:00:00.000Z' 이렇게 날짜가 차이나는 경우가 있다.
// 이것을 해결해주는 함수이다.
function UTFFomatter (UTFdate) {
    let date = UTFdate
    let newDate = new Date(date);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    let localDate = newDate.toLocaleDateString('ko-KR', options);
    let FomattedDate = localDate.replaceAll('.','').replaceAll(" ",'-')
    return FomattedDate
}

const milliFomatter = (millisecond) => {
    const tomorrow = new Date(millisecond);
    const year = tomorrow.getFullYear();
    const month = (tomorrow.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 +1을 해준 후 문자열로 변환하고 2자리로 맞춰줍니다.
    const date = tomorrow.getDate().toString().padStart(2, "0"); // 일도 문자열로 변환하고 2자리로 맞춰줍니다.
    const formattedDate = `${year}-${month}-${date}`; // 년, 월, 일을 하이픈으로 이어서 문자열로 만듭니다.

    return formattedDate }

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

const handleImgError = (e) => {
    e.target.src = `https://www.templestay.com/images/templeinfo-00.jpg`
};

// 이하는 로그인 시 사용하는 함수
// =======

// >>>>>>> 65afc36 (회원가입/로그인 - NextAuth)
const handleInput = (setInput, e) => {
    setInput(e.target.value);
};

const process_submit = async (url, data) => {
    const cnt = fetch(url, {
        method: 'POST', mode: 'cors',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    }).then(res => res.json());

    return (await cnt).cnt;
};

// 암호 입력시 해시함수에 의해 해시코드로 변환된 암호 생성
const hashPassword = async (passwd) => {
    let saltRounds = 10;
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(passwd, salt);
        console.log('hashpwd - ', hash, passwd, salt);

        return hash;
    } catch (err) {
        console.log(err);
    }
}

// 암호 비교 함수 - 암호와 해시화된 암호를 비교
const comparePasswd = async (passwd, hashpwd) => {
    try {
        const result = await bcrypt.compare(passwd, hashpwd);
        return result;
    } catch (err) {
        console.log(err);
    }
}

module.exports = { handleInput, process_submit,
// <<<<<<< HEAD
    hashPassword, comparePasswd, UTFFomatter, milliFomatter, dateFomatter, handleImgError};
// =======
//     hashPassword, comparePasswd };
// >>>>>>> 65afc36 (회원가입/로그인 - NextAuth)
