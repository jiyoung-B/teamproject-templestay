import Member from "../../../module/Member";

export default async (req, res) => {
    const {userid, passwd, name} = req.body;
    console.log('유저아이디 -', userid)
    console.log('리퀘스트바디 -', req.body)

    try {
        const cnt = new Member(userid, name, passwd).insert()
            .then(result => result);

        console.log('저장완료후 cnt확인왜해?', await cnt);
        res.status(200).json({cnt: await cnt});
    } catch (err) {
        res.status(500).json(err);
    }
}