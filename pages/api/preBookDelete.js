import PreBook from "../../module/PreBook";

export default async (req, res) => {
    let {userid}  = req.query
    try {
        let del = await new PreBook().Delete(userid).then(result => result)

        res.status(200).json(del);
    } catch (err) {
        res.status(500).json(err);
    }
}