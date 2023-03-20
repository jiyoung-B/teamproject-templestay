import Member from "../../../module/Member";

export default async (req, res) => {
    const [userid, passwd] = [req.query.userid, req.query.passwd];


    try {
        const member = new Member().login(userid, passwd).then(result => result);

        const result = (await member)[0];
        const data = { cnt: parseInt(await result.cnt),
            name: await result.name, email: await result.email}
        console.log('api login : ', data);

        res.status(200).json(data);
    }catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}


//http://localhost:3000/api/member/login
//http://localhost:3000/api/member/login?userid=abc123&passwd=987xyz