import Likeslist from "../../module/Likeslist";

export default async (req, res) => {
    let email = req.query.email;

    try {
        const likeslist = await Likeslist(email).then((lk) => lk);

        console.log('plz : ', likeslist);

        res.status(200).json(likeslist);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}