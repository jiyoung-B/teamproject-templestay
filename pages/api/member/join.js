import Member from "../../../module/Member";

export default async (req, res) => {
    const {name, userid, passwd} = req.body; // body로 넘겼기 때문에 body로 받아야함.
    console.log(name, userid, passwd);

    try{
        const cnt = new Member(name, userid, passwd).insert().then(result => result);

        console.log(await cnt);
        res.status(200).json({cnt: await cnt})

    }catch (err){
        res.status(500).json(err)
    }
}