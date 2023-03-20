

export default async (req, res) => {
    let { userId, PID, strData, endDate,  adult,  middle,  young,  preschool } = req.body


    try {

        res.status(200).json(req.body);
    } catch (err) {
        res.status(500).json(err);
    }
}