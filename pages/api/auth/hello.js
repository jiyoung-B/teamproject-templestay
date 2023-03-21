import bcrypt from 'bcryptjs';

const saltRounds = 10;   // salt키 생성 횟수 지정

// 암호 입력시 해시함수에 의해 해시코드로 변환된 암호 생성
const hashPassword = async (passwd) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(passwd, salt);

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


export default async (req, res) => {
    let [passwd1, passwd2] = ['aaa', 'aaa'];
    let hashed1 = '', hashed2 = '';

    try {
        hashed1 = await hashPassword(passwd1);
        hashed2 = await hashPassword(passwd2);

        let isMatch1 = await comparePasswd('abc123', hashed1);
        let isMatch2 = await comparePasswd('987xyz', hashed1);

        console.log('auth - bcrypt ', hashed1, hashed2);
        console.log('auth - bcrypt ', isMatch1, isMatch2);

        res.status(200).json({ hashed1: hashed1, hashed2: hashed2 });
    } catch (err) {
        console.log(err.message);
        res.status(500).json(err);
    }

}
