import axios from "axios";
import bcrypt from "bcryptjs";


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
    hashPassword, comparePasswd };
