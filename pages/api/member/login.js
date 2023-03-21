import Member from "../../../module/Member";

export default async (req, res) => {
    const [email, passwd] = [req.query.email, req.query.passwd];

    try {
        const member = new Member().login(email, passwd)
            .then(result => result);

        const result = (await member)[0];
        const data = { cnt: parseInt(await result.cnt),
            email: await result.email, passwd: await result.passwd }


        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

}

