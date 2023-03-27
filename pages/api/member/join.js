import Member from "../../../models/Member";

export default async (req, res) => {
    const {passwd, name, email} = req.body;

    try {
        const isEmail = await new Member().isEmail(email);
        const isEmailCnt = parseInt(isEmail[0].cnt);

        if (isEmailCnt) {
            res.status(200).json({ cnt: -1});
        } else {
            const cnt = new Member(passwd, name, email).insert()
                .then(result => result);
            res.status(200).json({cnt: await cnt});
        }

    } catch (err) {
        res.status(500).json(err);
    }
}

