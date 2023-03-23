import Member from "../../../module/Member";

export default async (req, res) => {
    const {email} = req.query;

    try {
        const member = new Member().selectOne(email).then(result => result);

        console.log('api myinfo : ', await member);

        res.status(200).json(await member);
    }catch (err) {
        res.status(500).json(err);
    }
}


//http://localhost:3000/api/member/myinfo
//http://localhost:3000/api/member/myinfo?userid=abc123