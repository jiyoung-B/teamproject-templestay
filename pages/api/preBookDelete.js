import PreBook from "../../module/PreBook";

export default async (req, res) => {
    let {email}  = req.query
    try {
        let del = await new PreBook().Delete(email).then(result => result)

        res.status(200).json(del);
    } catch (err) {
        res.status(500).json(err);
    }
}