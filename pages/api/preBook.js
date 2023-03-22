import PreBook from "../../module/PreBook";

export default async (req, res) => {
    let [userId, PID, strDate, endDate,  adult,  middle,  young,  preschool]  = req.body


    try {
        let cnt = await new PreBook().insertPreBook(userId.userId, PID.PID, strDate.strDate, endDate.endDate,  adult.adult,  middle.middle,  young.young,  preschool.preschool).then(result => result)

        res.status(200).json({cnt: cnt});
    } catch (err) {
        res.status(500).json(err);
    }
}