import PreBook from "../../models/PreBook";

export default async (req, res) => {
    let [email, PID, strDate, endDate,  adult,  middle,  young,  preschool]  = req.body


    try {
        let cnt = await new PreBook().insertPreBook(email.email, PID.PID, strDate.strDate, endDate.endDate,  adult.adult,  middle.middle,  young.young,  preschool.preschool).then(result => result)

        res.status(200).json({cnt: cnt});
    } catch (err) {
        res.status(500).json(err);
    }
}