import bcrypt from 'bcryptjs';
import {hashPassword, comparePasswd} from "../../../models/Utils";

const saltRounds = 10;   // salt키 생성 횟수 지정


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
